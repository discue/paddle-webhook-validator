'use strict'

const { factory: payloadValidatorFactory } = require('./payload/validator.js')
const { factory: signatureValidationFactory } = require('./signature/validator.js')
const errorHandler = require('./error-handler.js')

/**
 * @callback Middleware
 * @param {import('express').Request} req
 * @param {import('express').Request} res
 * @param {import('express').NextFunction} next
 */

/**
 * 
 * @param {object} options
 * @param {object} options.signatureValidation
 * @param {object} options.payloadValidation
 * @param {boolean} options.signatureValidation.enabled
 * @param {string} options.signatureValidation.secretKey
 * @param {boolean} options.payloadValidation.enabled
 * @returns {Middleware}
 */
module.exports = function ({ signatureValidation: { enabled: signatureValidationEnabled = true, secretKey }, payloadValidation: { enabled: payloadValidationEnabled = true } = {}, validationErrorHandler = errorHandler }) {
    if (signatureValidationEnabled && !secretKey) {
        throw new Error('Please pass a "signatureValidation.secretKey" to enable signature validation.')
    }

    let signatureValidator
    if (signatureValidationEnabled) {
        signatureValidator = signatureValidationFactory({ secretKey })
    }

    let payloadValidator
    if (payloadValidationEnabled) {
        payloadValidator = payloadValidatorFactory()
    }

    return async function (req, res, next) {
        if (signatureValidator) {
            const valid = await signatureValidator(req)
            if (!valid) {
                return validationErrorHandler(req, res, 'SignatureValidationError')
            }
        }

        if (payloadValidator) {
            const valid = await payloadValidator(req)
            if (!valid) {
                return validationErrorHandler(req, res, 'PayloadValidationError')
            }
        }

        next()
    }
}