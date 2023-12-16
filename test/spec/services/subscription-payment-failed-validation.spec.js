'use strict'

const validator = require('../../../lib/classic/services/schema-validator')(['sandbox-my.paddle.com'], ['paddle.com'] )

const { expect } = require('chai')

describe('PaymentFailedValidator', () => {

    let data

    const UPDATE_AND_EXPECT = (callback, expectation) => {
        const newData = callback(data)
        const isValid = validator(newData)
        expect(isValid).to.equal(expectation)
    }

    beforeEach(() => {
        data = {
            alert_id: '46382912',
            alert_name: 'subscription_payment_failed',
            amount: '808.38',
            attempt_number: '1',
            cancel_url: 'https://sandbox-checkout.paddle.com/subscription/cancel?user=5&subscription=2&hash=4f4b75c6a3e37ea827e97bbf95b83ac46d9d4fb8',
            checkout_id: '7-128e3df04159120-b316bfe6b7',
            currency: 'EUR',
            email: 'ritchie.vito@example.com',
            event_time: '2021-08-08 11:49:59',
            instalments: '9',
            marketing_consent: '0',
            next_retry_date: '2021-08-21',
            order_id: '7',
            passthrough: 'Example String',
            quantity: '58',
            status: 'active',
            subscription_id: '1',
            subscription_payment_id: '4',
            subscription_plan_id: '6',
            unit_price: '3.15',
            update_url: 'https://sandbox-checkout.paddle.com/subscription/update?user=5&subscription=5&hash=de02f4fe97e1ea310310215e7991614b438ed755',
            user_id: '9',
            p_signature: 'R28+OKAteLAZ9cySdcLrPFlgpuMOLpJaXyJedOch4sMDIDXfYqgdhhSjdeINCfHZF/wOTp1WySIHsQOJYKpSwoehfLT080S77o0shA8FFzqiRMfUHcXcm3l7cbzEjpuUOxvjIUn6JZYO5YMERIihfUpzIZu8TB6voLKcxL+xCNtvqPI8jOJxK8QBfSzNG5cNr+LKn5IMVXMXBPNrW00i7JdHdEOTJoQJQx5jzwftlFHNDZ6AiTxAwJjSx3TOt1n2XkRTcDnBhP5EFxIWlyWTZp7Vh3Ry/35ijoEfycbJWfk1MfORlM1hat6dszKws1PRwO2kiVeJgscNKfS+9i9B6vKloVLF2wK/FVWolCnSU45ZD+CBzsy4l4I1RfsTj36vDzdH+jtFO9chOLY24P9y1igma621IX8mAi9BoDkkt+OWC6wJlet6nQIQMy9sb4oOWH2hRyx8t5i7gWKNUELkClAjDbB8UL1mMntEN9926D7il8/CEmzv3d+HfKiO1jdHKAn4TVbrrgDcvEyDodyQ74RKIvixZMHn+A5VXwOn6jqRExZ1huJt2ew48KontPSajzc1iWR+T0oNf5pANMqMSeT30gM7ui8VELfXkwAcNBJAQMjZ7aGdgHl9+H3Se9Zz2jnQonn2bHn6wSMzqa2RZDhgyyFnab1WdMqAi4f16iM='
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

    it('returns false if alert_id contains not only digits', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { alert_id: 'a9' })
        }, false)
    })

    it('returns false if amount does not match pattern', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { amount: '1.234' })
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

    it('returns false if next_retry_date does not match pattern', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { next_retry_date: 'a9' })
        }, false)
    })

    it('returns true if retry_date contains a time', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { next_retry_date: '2022-01-02 02-03-04' })
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

    it('returns false if subscription_payment_id is not only numbers', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { subscription_payment_id: 'a9' })
        }, false)
    })

    it('returns false if instalments not a number', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { instalments: 'a9' })
        }, false)
    })

    it('returns false if order_id does not match pattern', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { order_id: '1.234' })
        }, false)
    })

    it('returns false if user_id is not only numbers', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { user_id: 'a9' })
        }, false)
    })

    it('returns false if attempt_number is not only numbers', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { attempt_number: 'a9' })
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