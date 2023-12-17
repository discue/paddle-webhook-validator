'use strict'

const { expect } = require('chai')
const { createHmac, randomUUID } = require('crypto')
const { factory, extracValidTimestamp, extractHeaderValues, extractValidSignature, validateSignature } = require('../../../../lib/billing/signature/validator.js')
const requestHelper = require('../request-helper.js')

const COMPARISON_FORMAT = 'hex'

describe('BillingSignatureValidator', () => {

    let signature
    let secretKey
    let payload
    let timestamp
    let signaturePayload

    beforeEach(() => {

        secretKey = randomUUID()
        payload = randomUUID().replace(/-/g, '')
        timestamp = parseInt(Date.now() / 1000)
        signaturePayload = `${timestamp}:${payload}`

        signature = createHmac('SHA256', secretKey)
            .update(signaturePayload)
            .digest()
            .toString('hex')
    })

    describe('.factory', () => {
        let validator
        beforeEach(() => {
            validator = factory({ secretKey })
        })

        it('returns true if signature was validated', async () => {
            const request = requestHelper({ paddleSignature: `ts=${timestamp};h1=${signature}`, body: payload })
            const valid = await validator(request)
            expect(valid).to.equal(true)
        })
        it('returns false if timestamp was altered', async () => {
            const request = requestHelper({ paddleSignature: `ts=timestamp;h1=${signature}`, body: payload })
            const valid = await validator(request)
            expect(valid).to.equal(false)
        })
        it('returns false if signature was altered', async () => {
            const request = requestHelper({ paddleSignature: `ts=${timestamp};h1=signature`, body: payload })
            const valid = await validator(request)
            expect(valid).to.equal(false)
        })
        it('returns false if payload was altered', async () => {
            const request = requestHelper({ paddleSignature: `ts=${timestamp};h1=${signature}`, body: 'payload' })
            const valid = await validator(request)
            expect(valid).to.equal(false)
        })
        it('returns false if body is empty', async () => {
            const request = requestHelper({ paddleSignature: 'ts=1234567890;h1=abc123' })
            const valid = await validator(request)
            expect(valid).to.equal(false)
        })
        it('returns false if timestamp is empty', async () => {
            const request = requestHelper({ paddleSignature: 'h1=abc123', body: payload })
            const valid = await validator(request)
            expect(valid).to.equal(false)
        })
        it('returns false if signature is empty', async () => {
            const request = requestHelper({ paddleSignature: 'ts=1234567890', body: payload })
            const valid = await validator(request)
            expect(valid).to.equal(false)
        })
    })

    describe('.extractHeaderValues', () => {
        it('extracts timestamp param', () => {
            const request = requestHelper({ paddleSignature: 'ts=1234567890;h1=abc123' })
            const { timestamp } = extractHeaderValues(request)
            expect(timestamp).to.equal('1234567890')
        })
        it('does not extract timestamp if format is invalid', () => {
            const request = requestHelper({ paddleSignature: 'ts=123;h1=abc123' })
            const { timestamp } = extractHeaderValues(request)
            expect(timestamp).to.equal(null)
        })
        it('returns null if timestamp is not part of header', () => {
            const request = requestHelper({ paddleSignature: 'h1=1234567890' })
            const { signature } = extractHeaderValues(request)
            expect(signature).to.equal(null)
        })
    })

    describe('.extracValidTimestamp', () => {
        it('validates and returns only signature value', () => {
            const timestamp = extracValidTimestamp("ts=1234567890")
            expect(timestamp).to.equal('1234567890')
        })
        it('returns null if format is invalid', () => {
            const timestamp = extracValidTimestamp("ts=1")
            expect(timestamp).to.equal(null)
        })
        it('returns null if timestamp is null', () => {
            const timestamp = extracValidTimestamp(null)
            expect(timestamp).to.equal(null)
        })
    })

    describe('.extractValidSignature', () => {
        it('extracts signature param', () => {
            const request = requestHelper({ paddleSignature: 'ts=1234567890;h1=eb4d0dc8853be92b7f063b9f3ba5233eb920a09459b6e6b2c26705b4364db151' })
            const { signature } = extractHeaderValues(request)
            expect(signature).to.equal('eb4d0dc8853be92b7f063b9f3ba5233eb920a09459b6e6b2c26705b4364db151')
        })
        it('does not extract signature if format is invalid', () => {
            const request = requestHelper({ paddleSignature: 'ts=1234567890;h1=abc123' })
            const { signature } = extractHeaderValues(request)
            expect(signature).to.equal(null)
        })
        it('returns null if signature is not part of header', () => {
            const request = requestHelper({ paddleSignature: 'ts=1234567890' })
            const { signature } = extractHeaderValues(request)
            expect(signature).to.equal(null)
        })
    })

    describe('.extractValidSignature', () => {
        it('validates and returns only signature value', () => {
            const signature = extractValidSignature("h1=eb4d0dc8853be92b7f063b9f3ba5233eb920a09459b6e6b2c26705b4364db151")
            expect(signature).to.equal('eb4d0dc8853be92b7f063b9f3ba5233eb920a09459b6e6b2c26705b4364db151')
        })
        it('returns null if format is invalid', () => {
            const signature = extractValidSignature("h1=abc123")
            expect(signature).to.equal(null)
        })
        it('returns null if signature is null', () => {
            const signature = extractValidSignature(null)
            expect(signature).to.equal(null)
        })
    })

    describe('.validateSignature', () => {

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

        it('returns true if signature is valid', () => {
            const valid = validateSignature(timestamp, signature, secretKey, payload)
            expect(valid).to.equal(true)
        })
        it('returns false if payload was invalid', () => {
            const valid = validateSignature(
                payload = '123',
                signature,
                secretKey,
                timestamp
            )
            expect(valid).to.equal(false)
        })
        it('returns false if signature was invalid', () => {
            const valid = validateSignature(
                payload,
                signature = '123',
                secretKey,
                timestamp
            )
            expect(valid).to.equal(false)
        })
        it('returns false if secretKey was invalid', () => {
            const valid = validateSignature(
                payload,
                signature,
                secretKey = '123',
                timestamp
            )
            expect(valid).to.equal(false)
        })
        it('returns false if timestamp was invalid', () => {
            const valid = validateSignature(
                payload,
                signature,
                secretKey,
                timestamp = Date.now() + 1000
            )
            expect(valid).to.equal(false)
        })
    })
})