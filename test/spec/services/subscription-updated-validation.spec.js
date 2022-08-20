'use strict'

const validator = require('../../../lib/services/schema-validator')(['sandbox-my.paddle.com'], ['paddle.com'] )

const { expect } = require('chai')

describe('SubscriptionUpdatedValidator', () => {

    let data

    const UPDATE_AND_EXPECT = (callback, expectation) => {
        const newData = callback(data)
        const isValid = validator(newData)
        expect(isValid).to.equal(expectation)
    }

    beforeEach(() => {
        data = {
            alert_id: '84168067',
            alert_name: 'subscription_updated',
            cancel_url: 'https://sandbox-checkout.paddle.com/subscription/cancel?user=1&subscription=8&hash=fd4091c9cca96a1ef5b0a9e2248d9821bbeb7157',
            checkout_id: '4-d18550981d343c0-7d513c5942',
            currency: 'EUR',
            email: 'xschmidt@example.com',
            event_time: '2021-08-08 10:09:04',
            linked_subscriptions: '4, 8, 2',
            marketing_consent: '',
            new_price: '3.01',
            new_quantity: '1',
            new_unit_price: '3.01',
            next_bill_date: '2021-09-01',
            old_next_bill_date: '2021-03-31',
            old_price: '3.01',
            old_quantity: '1',
            old_status: 'active',
            old_subscription_plan_id: '1',
            old_unit_price: '3.01',
            passthrough: 'Example String',
            status: 'active',
            subscription_id: '2',
            subscription_plan_id: '8',
            update_url: 'https://sandbox-checkout.paddle.com/subscription/update?user=1&subscription=5&hash=2aa650ed554eb656e2dbe5b6c55661f574908bf1',
            user_id: '5',
            p_signature: 'rLKuiHrzJV/RnmdiMPoS5feXl+WU2IuHWhWaC/yMbI7exezBy/9hp1FYN5/xBVBW1jojv8n6Wg6PcigGvZz7IH8wPUt7JFtvcNF1E5ap7TJS3ycYhkWLMTGBlm3x/Bld2bLRc+u8ZVUdK8mJoKeUGSWQvcW+1I3HYMgL3zqyaCB36aXyP/sT/u/3EYrdE8Yu5c6nTDrexJPHsTKKnnwRo4Gu6lwoLUxW1lSiHI38JbKMhY444OzsrjWioh98K4AIbjFDgjO/vnXIF6gn60dpd/oDvQjoXZly69NduhOacBIoqGTlz0dOK7jctgw6x6vjGJnWUKWYROWa3OPdiawe9iROftOORvlR6TssikKSN2D7IdEXthcXu3ved1dCrKgQC6ImGcXaG5wkgQbXQ54yZfusF2HNuV82k0C7EhaLeKeKURiVltwHMyaAMmnix5m9qWUjKeoEWu5fk0LosXomw+eV/Y6GKYaS2E+TxPh/HIU4tjKP3rZDUVruVIPLd3TtCvWRGq5ZVLF0lDVEXaYWnKwrxpAVeU974d2PMK173HqsG+L6N0iIx/a9skHx3So/tovpKmUGcE0aVba3YjJW+cvX3r2xD5yRzPvZO/5qMWxrznCmfJyppIrpfB9ZWgvt6ZdbH84Xo08QHuoV90qjaLMSnmPEkk7Y8xpN4g1al8U='
        }
    })

    it('returns true if payload is valid', () => {
        UPDATE_AND_EXPECT(data => data, true)
    })

    it('returns false if alert_id contains not only digits', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { alert_id: 'a9' })
        }, false)
    })

    it('returns true if cancel_url uses https and host ends with paddle.com', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { cancel_url: 'https://checkout.paddle.com' })
        }, true)
    })

    it('returns false if cancel_url uses http and host ends with paddle.com', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { cancel_url: 'http://checkout.paddle.com' })
        }, false)
    })

    it('returns false if cancel_url uses https and host ends with facebook.com', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { cancel_url: 'https://facebook.com' })
        }, false)
    })

    it('returns true if cancel_url uses http and host ends with sandbox-my.paddle.com', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { cancel_url: 'http://sandbox-my.paddle.com:3000' })
        }, true)
    })

    it('returns false if checkout_id is not a string', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { checkout_id: [] })
        }, false)
    })


    it('returns false if checkout_id is longer than 200 characters', () => {
        let s = ''
        for (let i = 0, n = 201; i <= n; i++) {
            s += '1'
        }

        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { checkout_id: s })
        }, false)
    })

    it('returns false if event_time does not match pattern', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { event_time: 'a9' })
        }, false)
    })

    it('returns false if marketing_consent not 0 or 1', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { marketing_consent: 'a9' })
        }, false)
    })

    it('returns true if marketing_consent is 0', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { marketing_consent: '0' })
        }, true)
    })

    const marketingConsentValues = ['0', '1']

    marketingConsentValues.forEach((marketing_consent) => {
        it('returns true if marketing_consent is ' + marketing_consent, () => {
            UPDATE_AND_EXPECT((data) => {
                return Object.assign(data, { marketing_consent })
            }, true)
        })
    })

    it('returns false if new_price is not only numbers', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { new_price: 'a9' })
        }, false)
    })

    it('returns false if new_price is not expected format', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { new_price: '222' })
        }, false)
    })

    it('returns false if new_quantity is not only numbers', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { new_quantity: 'a9' })
        }, false)
    })

    it('returns false if new_unit_price is not only numbers', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { new_unit_price: 'a9' })
        }, false)
    })

    it('returns false if new_unit_price is not expected format', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { new_unit_price: '222' })
        }, false)
    })

    it('returns false if next_bill_date does not match pattern', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { next_bill_date: 'a9' })
        }, false)
    })

    it('returns false if old_price is not only numbers', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { old_price: 'a9' })
        }, false)
    })

    it('returns false if old_price is not expected format', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { old_price: '222' })
        }, false)
    })

    it('returns false if old_quantity is not only numbers', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { old_quantity: 'a9' })
        }, false)
    })

    it('returns false if old_unit_price is not only numbers', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { old_unit_price: 'a9' })
        }, false)
    })

    it('returns false if old_unit_price is not expected format', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { old_unit_price: '222' })
        }, false)
    })

    it('returns false if currency contains not only letters', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { currency: 'a9' })
        }, false)
    })

    it('returns false if passthrough is longer than expected', () => {
        let s = ''
        for (let i = 0, n = 1001; i <= n; i++) {
            s += '1'
        }

        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { passthrough: s })
        }, false)
    })

    it('returns false if passthrough is not a string', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { passthrough: [] })
        }, false)
    })


    it('returns false if status it none of allowed values', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { status: 'a9' })
        }, false)
    })

    const validStatus = [
        "active",
        "trialing",
        "past_due",
        "paused",
        "deleted"
    ]

    validStatus.forEach((status) => {
        it('returns true if status has value ' + status, () => {
            UPDATE_AND_EXPECT((data) => {
                return Object.assign(data, { status })
            }, true)
        })
    })

    it('returns false if subscription_id is not only numbers', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { subscription_id: 'a9' })
        }, false)
    })

    it('returns false if subscription_plan_id is not only numbers', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { subscription_plan_id: 'a9' })
        }, false)
    })

    it('returns false if user_id is not only numbers', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { user_id: 'a9' })
        }, false)
    })

    it('returns true if update_url uses https and host ends with paddle.com', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { update_url: 'https://checkout.paddle.com' })
        }, true)
    })

    it('returns false if update_url uses http and host ends with paddle.com', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { update_url: 'http://checkout.paddle.com' })
        }, false)
    })

    it('returns false if update_url uses https and host ends with facebook.com', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { update_url: 'https://facebook.com' })
        }, false)
    })

    it('returns true if update_url uses http and host ends with sandbox-my.paddle.com', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { update_url: 'http://sandbox-my.paddle.com:3000' })
        }, true)
    })


    it('returns false if old_next_bill_date does not match pattern', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { old_next_bill_date: 'a9' })
        }, false)
    })

    it('returns false if old_status it none of allowed values', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { old_status: 'a9' })
        }, false)
    })

    validStatus.forEach((status) => {
        it('returns true if old_status has value ' + status, () => {
            UPDATE_AND_EXPECT((data) => {
                return Object.assign(data, { old_status: status })
            }, true)
        })
    })

    it('returns false if old_subscription_plan_id is not only numbers', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { old_subscription_plan_id: 'a9' })
        }, false)
    })

    it('returns false if paused_at does not match pattern', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { paused_at: '12334' })
        }, false)
    })

    it('returns false if paused_from does not match pattern', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { paused_at: '12334' })
        }, false)
    })

    it('returns false if paused_from is not allowed value', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { paused_reason: '12334' })
        }, false)
    })

    const pausedReasons = [
        "delinquent",
        "voluntary"
    ]

    pausedReasons.forEach((reason) => {
        it('returns true if paused_reason has value ' + reason, () => {
            UPDATE_AND_EXPECT((data) => {
                return Object.assign(data, { paused_reason: reason })
            }, true)
        })
    })

    it('returns false if p_signature is longer than 2000 characters', () => {
        let s = ''
        for (let i = 0, n = 2001; i <= n; i++) {
            s += '1'
        }

        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { p_signature: s })
        }, false)
    })

    it('returns false if p_signature containts not allowed character', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { p_signature: '#' })
        }, false)
    })
})