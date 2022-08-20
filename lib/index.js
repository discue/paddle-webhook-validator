'use strict'

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * 
 * @param {*} callback 
 * @returns {(Request:request, Response:response, NextFunction:next) => void} Middleware function
 */
module.exports = ({ publicKeyFilePath, publicKeyText, allowedHttpHosts = ['sandbox-my.paddle.com'], allowedHttpsHosts = ['paddle.com'] }) => {

    /**
     * @type {import('express').Router} 
     */
    const verifySignature = require('./services/verify-signature')({ publicKeyText, publicKeyFilePath })
    const validatePayload = require('./services/schema-validator')(allowedHttpHosts, allowedHttpsHosts)

    return (req, _, next) => {
        const { body } = req

        try {
            const validSignature = verifySignature(body)
            const validPayload = validatePayload(body)

            if (validSignature && validPayload) {
                next()
                return
            }
        } catch (e) {
            // 
        }

        next('Unauthorized')
    }
}