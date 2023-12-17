'use strict'

const { expect } = require('chai')
const { createHmac, randomUUID } = require('crypto')
const { validate } = require('../../../../lib/billing/signature/hmac-validator.js')

const COMPARISON_FORMAT = 'hex'

describe('BillingHmacValidator', () => {

    let signature
    let secretKey
    let payload
    let timestamp

    beforeEach(() => {

        secretKey = randomUUID()
        payload = randomUUID()
        timestamp = Date.now()
        const signaturePayload = `${timestamp}:${payload}`

        signature = createHmac('SHA256', secretKey)
            .update(signaturePayload)
            .digest()
            .toString(COMPARISON_FORMAT)
    })

    it('returns true if signature was validated correctly', () => {
        const valid = validate({
            payload,
            signature,
            secretKey,
            timestamp
        })
        expect(valid).to.equal(true)
    })
    it('returns false if payload was invalid', () => {
        const valid = validate({
            payload: '123',
            signature,
            secretKey,
            timestamp
        })
        expect(valid).to.equal(false)
    })
    it('returns false if signature was invalid', () => {
        const valid = validate({
            payload,
            signature: '123',
            secretKey,
            timestamp
        })
        expect(valid).to.equal(false)
    })
    it('returns false if secretKey was invalid', () => {
        const valid = validate({
            payload,
            signature,
            secretKey: '123',
            timestamp
        })
        expect(valid).to.equal(false)
    })
    it('returns false if timestamp was invalid', () => {
        const valid = validate({
            payload,
            signature,
            secretKey,
            timestamp: Date.now() + 1000
        })
        expect(valid).to.equal(false)
    })
})