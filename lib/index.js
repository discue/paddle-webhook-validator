'use strict'

const express = require('express')
const verifySignature = require('./services/verify-signature')
const validatePayload = require('./services/schema-validator')

/**
 * @typedef {import('express').Router} Router
 */

/**
 * 
 * @param {*} callback 
 * @returns Router
 */
module.exports = () => {

    /**
     * @type Router
     */
    const router = express.Router()

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