'use strict'

const express = require('express')

let verifySignature
let validatePayload

/**
 * @typedef {import('express').Router} Router
 */

/**
 * 
 * @param {*} callback 
 * @returns Router
 */
module.exports = ({ publicKeyFilePath, allowedHttpHosts = ['sandbox-my.paddle.com'], allowedHttpsHosts = ['paddle.com'] }) => {

    /**
     * @type Router
     */
    const router = express.Router()

    verifySignature = require('./services/verify-signature')(publicKeyFilePath)
    validatePayload = require('./services/schema-validator')(allowedHttpHosts, allowedHttpsHosts)

    router.use((req, _, next) => {
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
    })

    return router
}