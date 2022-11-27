'use strict'

const validator = require('../../../lib/services/schema-validator')(['sandbox-my.paddle.com'], ['paddle.com'])

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
            alert_id: '746440922',
            alert_name: 'subscription_payment_succeeded',
            balance_currency: 'USD',
            balance_earnings: '557.8',
            balance_fee: '792.19',
            balance_gross: '81.7',
            balance_tax: '553.35',
            checkout_id: '6-2a237989a49e4be-3d49169283',
            country: 'DE',
            coupon: 'Coupon 1',
            currency: 'USD',
            customer_name: 'customer_name',
            earnings: '337.34',
            email: 'awiegand@example.com',
            event_time: '2021-08-08 10:47:47',
            fee: '0.75',
            initial_payment: '1',
            instalments: '2',
            marketing_consent: '1',
            next_bill_date: '2021-08-25',
            next_payment_amount: '4.35',
            order_id: '2',
            passthrough: 'Example String',
            payment_method: 'paypal',
            payment_tax: '0.95',
            plan_name: 'Example String',
            quantity: '79',
            receipt_url: 'https://sandbox-my.paddle.com/receipt/5/ba9910942a7331d-722813e1b3',
            sale_gross: '436.34',
            status: 'trialing',
            subscription_id: '9',
            subscription_payment_id: '8',
            subscription_plan_id: '1',
            unit_price: '2.35',
            user_id: '3',
            p_signature: 'TzwfWanmyu09Aat1eL8n1ztXlijhs7nGAF/XO3+3ZKrH5FfZfVWN61VZZui+wSAyJHe8TRtf1UF8riOsxUP445/mDfI156Eco70qABw2g0A6msMnpKcIsE9Zzqrw68sNn1iff+zY/c2vw5nflBQPkX2whu8sDbvglG6u+5Hz0ObwsR7m0R3A/HVd78GDsuQP7dTW4tu3iGhN/lxLLNOH/HIqL7LrHlHsC7of197zi12A7VzPcVe7UzokE1xqYsv+cHsD9bUTngqfsI7C0fQW6i1NSs0dT9fYcRuULown1M+gcHCpSF1PDgb2US71vsxyH7bkXiGP0+uM1caZduitCY9BHYFH6i371LeqEFNE16sxN3roBOCkgJkrxOH8pp+t1Z0/kYIIHCbdvfHrKaQmoKZqKDWZFfQD0u+heyXS4B/+Ma1RgNVy6l/fOd0ClAPygTLf2jUr4B7wL7RjbDwdVQeXj2tam6H/4jsQsfCwDW4Vy3gzhGvX2eML9SGFoCcwrKCjlhxLj/084vRWojleGha3KmxUSQlcZGppaUw1x8nEoeW3esyaUlp/Awk/jGccutmhIkmOXxG6O4Qt4cLSQXa9lxDj66RwzNorBk/Qx7bcwm49q4LkwEAl6gbekaxmMcrt6io+n1kYYowCvaLsBuIhNXTyLvE2ChvoYsoekYU='
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

    it('returns false if balance_currency contains not only letters', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { balance_currency: 'a9' })
        }, false)
    })

    it('returns false if balance_currency contains more than 3 letters', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { balance_currency: 'AAAA' })
        }, false)
    })

    it('returns false if balance_earnings does not match pattern', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { balance_earnings: '1.234' })
        }, false)
    })

    it('returns false if balance_fee does not match pattern', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { balance_fee: '1.234' })
        }, false)
    })

    it('returns false if balance_gross does not match pattern', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { balance_gross: '1.234' })
        }, false)
    })

    it('returns false if balance_tax does not match pattern', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { balance_tax: '1.234' })
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

    it('returns false if country does not match pattern', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { country: 'ABCD' })
        }, false)
    })

    it('returns false if coupon is longer than 300 characters', () => {
        let s = ''
        for (let i = 0, n = 301; i <= n; i++) {
            s += '1'
        }

        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { coupon: s })
        }, false)
    })

    it('returns false if currency contains not only letters', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { currency: 'a9' })
        }, false)
    })

    it('returns false if customer name is longer than 200 characters', () => {
        let s = ''
        for (let i = 0, n = 201; i <= n; i++) {
            s += '1'
        }

        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { customer_name: s })
        }, false)
    })

    it('returns false if earnings does not match pattern', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { earnings: '1.234' })
        }, false)
    })

    it('returns false if event_time does not match pattern', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { event_time: 'a9' })
        }, false)
    })

    it('returns false if fee does not match pattern', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { fee: '1.234' })
        }, false)
    })

    it('returns false if initial_payment not 0 or 1', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { initial_payment: 'a9' })
        }, false)
    })

    const initialPaymentValues = ['0', '1']

    initialPaymentValues.forEach((initial_payment) => {
        it('returns true if initial_payment is ' + initial_payment, () => {
            UPDATE_AND_EXPECT((data) => {
                return Object.assign(data, { initial_payment })
            }, true)
        })
    })

    it('returns false if instalments not a number', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { instalments: 'a9' })
        }, false)
    })

    it('returns false if marketing_consent not 0 or 1', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { marketing_consent: 'a9' })
        }, false)
    })

    const marketingConsentValues = ['0', '1']

    marketingConsentValues.forEach((marketing_consent) => {
        it('returns true if marketing_consent is ' + marketing_consent, () => {
            UPDATE_AND_EXPECT((data) => {
                return Object.assign(data, { marketing_consent })
            }, true)
        })
    })

    it('returns false if next_bill_date does not match pattern', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { next_bill_date: 'a9' })
        }, false)
    })

    it('returns true if next_bill_date contains a time', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { next_bill_date: '2022-02-03 02-03-04' })
        }, false)
    })

    it('returns false if next_payment_amount does not match pattern', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { next_payment_amount: '1.234' })
        }, false)
    })

    it('returns false if order_id does not match pattern', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { order_id: '1.234' })
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

    it('returns false if passthrough is not a string', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { passthrough: [] })
        }, false)
    })

    it('returns false if payment_method is not card or paypal', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { payment_method: ['Western Union'] })
        }, false)
    })

    const paymentMethods = ['card', 'paypal']

    paymentMethods.forEach((payment_method) => {
        it('returns true if payment method is ' + payment_method, () => {
            UPDATE_AND_EXPECT((data) => {
                return Object.assign(data, { payment_method })
            }, true)
        })
    })

    it('returns false if payment_tax does not match pattern', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { payment_tax: '1.234' })
        }, false)
    })

    it('returns false if plan_name is longer than 200 characters', () => {
        let s = ''
        for (let i = 0, n = 201; i <= n; i++) {
            s += '1'
        }

        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { plan_name: s })
        }, false)
    })

    it('returns false if quantity is not only numbers', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { quantity: 'a9' })
        }, false)
    })

    it('returns true if receipt_url uses https and host ends with paddle.com', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { receipt_url: 'https://checkout.paddle.com' })
        }, true)
    })

    it('returns false if receipt_url uses http and host ends with paddle.com', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { receipt_url: 'http://checkout.paddle.com' })
        }, false)
    })

    it('returns false if receipt_url uses https and host ends with facebook.com', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { receipt_url: 'https://facebook.com' })
        }, false)
    })

    it('returns true if receipt_url uses http and host ends with sandbox-my.paddle.com', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { receipt_url: 'http://sandbox-my.paddle.com:3000' })
        }, true)
    })

    it('returns false if sale_gross does not match pattern', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { sale_gross: '1.234' })
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

    it('returns false if subscription_payment_id is not only numbers', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { subscription_payment_id: 'a9' })
        }, false)
    })

    it('returns false if subscription_plan_id is not only numbers', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { subscription_plan_id: 'a9' })
        }, false)
    })

    it('returns false if unit_price does not match pattern', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { unit_price: '1.234' })
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