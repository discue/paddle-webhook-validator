'use strict'

const validator = require('../../../lib/services/schema-validator')(['sandbox-my.paddle.com'], ['paddle.com'] )

const { expect } = require('chai')

describe('SubscriptionCancelledValidator', () => {

    let data

    const UPDATE_AND_EXPECT = (callback, expectation) => {
        const newData = callback(data)
        const isValid = validator(newData)
        expect(isValid).to.equal(expectation)
    }

    beforeEach(() => {
        data = {
            alert_id: '439273720',
            alert_name: 'subscription_cancelled',
            cancellation_effective_date: '2021-09-04',
            checkout_id: '3-21a8f3aba7b822b-5e53440387',
            currency: 'EUR',
            email: 'jocelyn.goodwin@example.org',
            event_time: '2021-08-08 09:47:33',
            linked_subscriptions: '3, 5, 9',
            marketing_consent: '0',
            passthrough: 'Example String',
            quantity: '86',
            status: 'deleted',
            subscription_id: '4',
            subscription_plan_id: '8',
            unit_price: '3.25',
            user_id: '9',
            p_signature: 'wFOagDjx9PbqhlavLMWYLJ1RHqSyAuepiZDJfGHAJ4Y/P8oioqSRGPk68SsCUyTXc9qPmD5TZMDqAhcmEtw2br0kJuNj55nkBug7P7TIv0sZJQluHGmyuWEoXIMR+ztbOPLZ3NGv4v3n7LyhmxY+9CrLU4YsEHoNOQ2lBoTC42rxqY8JRGrXlETn9AEjsLqsWkvL+C+022EQOp3sRVOm6NH8RGBiA4GMHTIZQN7O4zVOkN4f4hRaEsUZHjMhbMKVr3wKxfPmJrsS+BcsBQRbpEPNutAhzlthy2GR7wDmqXfXrLeiFibL8a9NVxm6MMVE5cgnctczsc/DQlVAS21VpYq2xdqrHkbF6Nq0mgAczLEu4N5ARB0m8Uk8mEWhalTW700mS+sJ3BUsI5xZGxXNRBnpwuvC+7wViaJYQfdttImAROtQJYyBA07U4qPUS2AY62Zr4MagCMz//tLa97M6RlY9/Weg1pcTzINrJ2BJ8WXVk1hYbYc7uODs5Ck9TxUpECRwVY3y4bs9dfoNKykLpY3KjmsIogHJsHH0+LkaWBMcEW+cYZ3/vqfHmqWZbeNxnkNkkH/TOD6+tLJOhCdzORZOrsavixkEgEQrhPYS/PHrti75JNucDLW+Z8r7R2lYMcICdpxH+nyKdmLogUGyMFXzoI8FU3WnrDQA7+32X5A='
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

    it('returns false if cancellation_effective_date does not match pattern', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { alert_id: '2021-09-04' })
        }, false)
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

    it('returns false if currency contains not only letters', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { currency: 'a9' })
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

    it('returns false if quantity is not only numbers', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { quantity: 'a9' })
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

    it('returns false if unit_price is not only numbers', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { unit_price: 'a9' })
        }, false)
    })

    it('returns false if unit_price is not expected format', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { unit_price: '222' })
        }, false)
    })

    it('returns false if user_id is not only numbers', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { user_id: 'a9' })
        }, false)
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