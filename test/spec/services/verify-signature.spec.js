'use strict'

const fs = require('fs')
const { expect } = require('chai')

const publicKeyFilePath = './test/fixtures/pk.txt'

describe('SignatureVerifier', () => {

    let data

    [1, 2].forEach(index => {
        let verify

        if (index === 1) {
            verify = require('../../../lib/services/verify-signature')({ publicKeyFilePath })
        } else {
            const publicKeyText = fs.readFileSync(publicKeyFilePath)
            verify = require('../../../lib/services/verify-signature')({ publicKeyText })
        }

        beforeEach(() => {
            data = {
                alert_id: '1603168873',
                alert_name: 'payment_succeeded',
                balance_currency: 'USD',
                balance_earnings: '810.28',
                balance_fee: '143.25',
                balance_gross: '972.45',
                balance_tax: '20.77',
                checkout_id: '4-5f3dfb6066d6a6a-4891dd0da0',
                country: 'FR',
                coupon: 'Coupon 8',
                currency: 'USD',
                customer_name: 'customer_name',
                earnings: '687.95',
                email: 'victor08@example.net',
                event_time: '2021-08-08 07:22:35',
                fee: '0.87',
                ip: '254.19.217.224',
                marketing_consent: '',
                order_id: '5',
                passthrough: 'Example String',
                payment_method: 'card',
                payment_tax: '0.75',
                product_id: '1',
                product_name: 'Example String',
                quantity: '76',
                receipt_url: 'https://sandbox-my.paddle.com/receipt/1/dd9557e2129d347-3ee5740828',
                sale_gross: '905.59',
                used_price_override: 'true',
                p_signature: 'oKv7316g3ZX41DdL7a9LJYIZA9Ib2Sqx0OBoBIymkzpVgkOspag1+DFkrk7oMkLEmLl/u27gEcIZDA111rG6j3Aa+0AodYYXqbWzVRE6lohKQGiz0657xZ4K3fLd/YxFg7kN1+ikcNARtdrX3Tt060yBFNTRNLeIFG7sQelFt4CLepjmy/k6kwP0B0ca8ert9Wo8EgxzcW71T9Y1IyGxtQsk9Hgdbahe7vkphUvLVKojOfVhh0ZkDSD+vt7RxDvik3YduhSA57PwhZB1a3YaQ7mBxseAIGTBiRLikR6PsoGyXRf0qkvnXkuYCVzQoQ/Z2fbpgpZOxGwmYn2E9PYXIHRKBBBvxVUWZ+wudiwL2LDQet/FmMvahy4NSZMRUQPY4wTqZGtWZm/KBkPCYj1xJjdYE53ddP39O1fmh7I1PwCP5UpAfveUFFbWd5lw6ltGcC0Wk1ZdM8DngaFn7BdhbWWYfcsgLz+5oOHZvP078hGeug7FjMqKCP1zKtcL3q5sPqxoOSQSkQaIWBCeayNMv37fDp/M1Gn5ZofPmPw5hxHWZ+Esu/t5yVxRHuv0/ARh2HevrWLnctMb/YxyPbsvs1He0iR2s7d5ZYF/ZZZOpZhZs5b8dvksXXRGDjQMORk/zCVed3SUzQmdjk+ypXyTdj6t8vx7ijEIqrGa4pfBhlE='
            }
        })

        it('returns true if signature is valid', () => {
            const verified = verify(data)
            expect(verified).to.be.true
        })

        it('returns false if property is missing', () => {
            delete data.order_id
            const verified = verify(data)
            expect(verified).to.be.false
        })

        it('returns false if a property value was tampered', () => {
            data.order_id = 6
            const verified = verify(data)
            expect(verified).to.be.false
        })

        it('returns false if signature was tampered', () => {
            data.p_signature = 'abc' + data.p_signature
            delete data.p_signature
            const verified = verify(data)
            expect(verified).to.be.false
        })

        it('returns false if signature is missing', () => {
            delete data.p_signature
            const verified = verify(data)
            expect(verified).to.be.false
        })
    })

    it('throws if no public key path or text was given', () => {
        expect(() => {
            require('../../../lib/services/verify-signature')({  })
        }).to.throw(/^Please provide either/)
    })
})