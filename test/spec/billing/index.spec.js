'use strict'

const { expect } = require('chai')
const { createHmac, randomUUID } = require('crypto')
const factory = require('../../../lib/billing/index.js')
const requestHelper = require('./request-helper.js')
const responseHelper = require('./response-helper.js')

describe('BillingHookValidator', () => {

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

    it('calls next if both validators are disabled', (done) => {
        const middleware = factory(
            {
                signatureValidation: { enabled: false },
                payloadValidation: { enabled: false }
            }
        )
        middleware(null, null, done)
    })
    it('calls next if both validators finished', (done) => {
        const request = requestHelper({ paddleSignature: `ts=${timestamp};h1=${signature}`, body: payload })
        const middleware = factory(
            {
                signatureValidation: { secretKey }
            }
        )
        middleware(request, null, done)
    })
    it('returns error if timestamp was altered', async () => {
        const request = requestHelper({ paddleSignature: `ts=timestamp;h1=${signature}`, body: payload })
        const response = responseHelper()
        const middleware = factory(
            {
                signatureValidation: { secretKey }
            }
        )
        await middleware(request, response)
        expect(response.getStatusCode()).to.equal(400)
    })
    it('returns error if signature was altered', async () => {
        const request = requestHelper({ paddleSignature: `ts=${timestamp};h1=signature`, body: payload })
        const response = responseHelper()
        const middleware = factory(
            {
                signatureValidation: { secretKey }
            }
        )
        await middleware(request, response)
        expect(response.getStatusCode()).to.equal(400)
    })
})