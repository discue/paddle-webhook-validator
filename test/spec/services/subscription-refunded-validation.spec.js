'use strict'

const validator = require('../../../lib/classic/services/schema-validator')(['sandbox-my.paddle.com'], ['paddle.com'] )

const { expect } = require('chai')

describe('PaymentSucceededValidator', () => {

    let data

    const UPDATE_AND_EXPECT = (callback, expectation) => {
        const newData = callback(data)
        const isValid = validator(newData)
        expect(isValid).to.equal(expectation)
    }

    beforeEach(() => {
        data = {
            alert_id: '1535227955',
            alert_name: 'subscription_payment_refunded',
            amount: '979.86',
            balance_currency: 'GBP',
            balance_earnings_decrease: '0.25',
            balance_fee_refund: '0.49',
            balance_gross_refund: '0.04',
            balance_tax_refund: '0.56',
            checkout_id: '1-915ed74ead1b571-ab0917ff2a',
            currency: 'USD',
            earnings_decrease: '0.2',
            email: 'lorna64@example.net',
            event_time: '2021-08-08 12:03:26',
            fee_refund: '0.65',
            gross_refund: '0.6',
            initial_payment: '1',
            instalments: '7',
            marketing_consent: '1',
            order_id: '9',
            passthrough: 'Example String',
            quantity: '93',
            refund_reason: 'refund_reason',
            refund_type: 'full',
            status: 'active',
            subscription_id: '7',
            subscription_payment_id: '4',
            subscription_plan_id: '2',
            tax_refund: '0.2',
            unit_price: '3.10',
            user_id: '4',
            p_signature: 'qNfawGBRTfxH5H4ThsbB8lCN4cptwOUMGLHHuDigWtHUYJwqPFM2hvIn4cWPAwwfm5//k5JlVF0gpAlwLAt+rowNn/1bF/f8EmEnESkyGVriQ0P2Z1qCAar5L2L8shCOOGDg9sEz0DUDrUyO2TQA5MQEAcxSI6FXkrlPLnW8y1tCZtpgzI6/Rm9dJBpye0vFBmU/lj2Uqp4U/5ygWmbMVYTUrJQ7nyHfVmzgX0dYn4DAGUkYTBGws1jXNu3/livk2XmpaXUWydSRXu7LCp9OY8+7vTmE1RAzK1Tb2sQry+ciyO5lB9IlYAEK8+iH99LFbZAURJJtiiXUJcHkJG+YqT2V4B0MydqBFdnrHN5ilEwBdCRQIXsUHNnV/iZqAUyM7xeqRRhBcjbMjG7idMC4KUkHVuO+S63fhnQ9XXbP65t9FjYxpmRq1o7anIiKFaiGcremCVvz5G5wWXXkiZBT5yBKWxur/5JhOXGLv2NCZ+jUJAAloUG78FSE1mlPE7pxsXzWyHcjiwuha2h9bTAz95ADymiYIGvZ2fbVLulmQQ0tf6fCCRLMOIbO0V2SBuyTLF7ZKSODktmkymZBZKitSLQqsyCE5+Bwi/nJPzthvGvpXoeU2qrABxk7sIcd74z/8jflwkYrGBjNQ3p1QdFl5zRy9AnXvdtbaYWQAOfktdU='
        }
    })

    it('returns true if payload is valid', () => {
        UPDATE_AND_EXPECT(data => data, true)
    })

    it('deletes unknown keys', () => {
        let payload
        UPDATE_AND_EXPECT((data) => {
            payload = Object.assign(data, { unknown: 'a9' })
            return payload
        }, true)

        expect(payload.unknown).to.be.undefined
    })

    it('does not delete custom_data', () => {
        let payload
        UPDATE_AND_EXPECT((data) => {
            payload = Object.assign(data, { custom_data: 'a9' })
            return payload
        }, true)

        expect(payload.custom_data).to.equal('a9')
    })
})