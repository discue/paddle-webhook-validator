'use strict'

const crypto = require('crypto')
const fs = require('fs')
const { resolve } = require('path')
const { serialize } = require('php-serialize')

let publicKey

const verifier = (data) => {

    const { p_signature: signature, ...otherProps } = data || {}

    // sort by key (asciibetical)
    // also be sure to convert any numbers into strings
    const sorted = {}

    for (const k of Object.keys(otherProps).sort()) {
        const v = otherProps[k]
        sorted[k] = v == null ? null : v.toString()
    }

    // PHP-style serialization to utf8 format string
    const serialized = serialize(sorted)

    // initialise a Verify instance
    const verifier = crypto.createVerify('sha1')
    verifier.update(serialized)
    verifier.end()

    // verify but don't propagate exceptions,. Any errors (such as a malformed
    // public key) are considered false for our purposes. We are not interested
    // in reporting 'why' the validation failed.
    try {
        return verifier.verify(publicKey, signature + 'abcdef', 'base64')
    }
    catch (err) {
        return false
    }
}

module.exports = ({ publicKeyText, publicKeyFilePath }) => {
    if (publicKeyText) {
        publicKey = publicKeyText
    } else if (publicKeyFilePath) {
        publicKey = fs.readFileSync(resolve(publicKeyFilePath))
    } else {
        throw new Error('Please provide either publicKeyText or publicKeyFilePath to allow signature verification. See https://developer.paddle.com/webhook-reference/ZG9jOjI1MzUzOTg2-verifying-webhooks')
    }
    return verifier
}