'use strict'

const { validate: computeAndCompareHmacSignature } = require('./hmac-validator.js')

const SIGNATURE_HEADER = 'paddle-signature'
const TIMESTAMP_REGEX = /^ts=[0-9]{10}$/
const SIGNATURE_REGEX = /^h1=[0-9a-z]{64}$/

/**
 * @callback ValidationFunction
 * @param {import('express').Request} req
 * @returns {boolean}
 */

/**
 * 
 * @param {import('express').Request} req 
 * @returns {String}
 */
module.exports.extractPayload = function extractPayload(req) {
    return req.body || null
}

/**
 * 
 * @param {string} [timestamp] as find in signature header format ts=0123456789
 * @returns {string} the actual timestamp value
 */
module.exports.extracValidTimestamp = function extracValidTimestamp(timestamp) {
    const timestampHasValidFormat = TIMESTAMP_REGEX.test(timestamp)
    if (timestampHasValidFormat) {
        const split = timestamp.split('=')
        return split[1]
    }
    return null
}

/**
 * 
 * @param {string} [signature] as find in signature header format h1=eb4d0dc8853be92b7f063b9f3ba5233eb920a09459b6e6b2c26705b4364db151
 * @returns {string} the actual timestamp value
 */
module.exports.extractValidSignature = function extractValidSignature(signature) {
    const timestampHasValidFormat = SIGNATURE_REGEX.test(signature)
    if (timestampHasValidFormat) {
        const split = signature.split('=')
        return split[1]
    }
    return null
}

/**
 * @typedef TimestampAndSignature
 * @property {string} [timestamp]
 * @property {string} [signature]
 */

/**
 * 
 * @param {import('express').Request} req 
 * @returns {TimestampAndSignature}
 */
module.exports.extractHeaderValues = function extractHeaderValues(req) {
    const value = req.headers[SIGNATURE_HEADER]
    const split = value.split(';')
    return {
        timestamp: module.exports.extracValidTimestamp(split.at(0)),
        signature: module.exports.extractValidSignature(split.at(1))
    }
}

/**
 * 
 * @param {string} timestamp timestamp used for signature creation
 * @param {string} signature signature 
 * @param {string} secretKey secret key used to sign the payload
 * @param {string} payload payload
 * @returns {boolean}
 */
module.exports.validateSignature = function validateSignature(timestamp, signature, secretKey, payload) {
    return computeAndCompareHmacSignature({
        signature, secretKey, timestamp, payload
    })
}

/**
 * 
 * @param {object} options
 * @param {string} options.secretKey secret key to used for siganture validation 
 * @returns {ValidationFunction}
 */
module.exports.factory = function ({ secretKey }) {

    /**
     * @returns {Promise.<boolean>}
     */
    return async function validate(req) {
        const payload = module.exports.extractPayload(req)
        if (!payload) {
            return false
        }
        const { timestamp, signature } = module.exports.extractHeaderValues(req)
        if (!timestamp || !signature) {
            return false
        }

        const isSignatureValid = module.exports.validateSignature(timestamp, signature, secretKey, payload)
        return isSignatureValid
    }
}