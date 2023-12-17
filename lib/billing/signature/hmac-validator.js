'use strict'

const { createHmac } = require('crypto')

const COMPARISON_FORMAT = 'hex'

module.exports.validate = function ({ signature, timestamp, secretKey, payload }) {
    const signaturePayload = `${timestamp}:${payload}`
    const calculatedSignature = createHmac('SHA256', secretKey)
        .update(signaturePayload)
        .digest()
        .toString(COMPARISON_FORMAT)
    return calculatedSignature === signature
}