'use strict'

const validator = require('../../../lib/services/schema-validator')(['sandbox-my.paddle.com'], ['paddle.com'] )

const { expect } = require('chai')

describe('SubscriptionCreatedValidator', () => {

    let data

    const UPDATE_AND_EXPECT = (callback, expectation) => {
        const newData = callback(data)
        const isValid = validator(newData)
        expect(isValid).to.equal(expectation)
    }

    beforeEach(() => {
        data = {
            alert_id: '2014203184',
            alert_name: 'subscription_created',
            cancel_url: 'https://sandbox-my.paddle.com/subscription/cancel?user=9&subscription=5&hash=13f3e703caa74b5dd758faf3a24b415fd32e245d',
            checkout_id: '3-d557ce34ede543e-9ac21077b0',
            currency: 'USD',
            email: 'leffler.zola@example.org',
            event_time: '2021-08-08 07:46:58',
            linked_subscriptions: '3, 1, 2',
            marketing_consent: '',
            next_bill_date: '2021-08-29',
            passthrough: 'Example String',
            quantity: '17',
            source: 'Trial',
            status: 'active',
            subscription_id: '8',
            subscription_plan_id: '9',
            unit_price: '3.25',
            update_url: 'https://sandbox-my.paddle.com/subscription/update?user=1&subscription=6&hash=7d49e417e9492ad53a3fd17bc97f63927c2c0973',
            user_id: '9',
            p_signature: 'bHmaeUYMbvmsNnzOCXsecnz0mqshAtNJLT1rmxQ7vwYCg8zG/HinjTxrdfttEBqEy7GX9MC/QGpi96azJYG6+iml1Ic/KNOCWk/7Omw14V4buuYtXwo/jh8U8PKnT5RQgxOHBIupiAWd95ulTIxD1SgXz5gFnlbCAj5iiqDKin3d9KYjnCHfUNkF0SGYdIOw4nAOC2cgt1hnBMnZlYkguDIpNpjQtYbKakxJWm/9Ix9czg3c3IuIAPMxxi6PDXFbfSBv0Gx0iiwbrYOY4mb/NLwVIVqwZjcXd7YrwZGXGwTY94u+B4PhI5BumLPWDK0eGrWx9gB8vQhrYkpl1myIbm3dafljAr9tIHsIaHRjpVTpoCLPfSUlNz95YAKNMON+Vfw1cqrdIRhIPC4fWudVKYH2YT4Lo36qZgOPxDiTv4KwQ+ItP2vIEe7x82gte/A73wQ0O7Z/XkC64k7Ya8uScdlTUhei3gI4q6Ikt86x4yHcXktKG2x3JiEzwQ8j9rUJ7S7zCsuqsiH9bUiOSFlklFB1xC36iRtmJaO4uCa2IeJBuLdzgYFGeGtrN00I24FLc6XfMZSDOG04JVwrBDLSrn1W4Oefw5OH1B/NM87wu44byO3tCHtIvnuB/GjnzbMYA1SY3Er4zWdLrjwUa8BXSousvnuqKF8/cLOXAo9LBs8='
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
            return Object.assign(data, { cancel_url: 'https://sandbox-my.paddle.com' })
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

    it('returns false if next_bill_date does not match pattern', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { next_bill_date: 'a9' })
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

    it('returns false if source is not a string', () => {
        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { source: [] })
        }, false)
    })

    it('returns false if source is longer than 200 characters', () => {
        let s = ''
        for (let i = 0, n = 201; i <= n; i++) {
            s += '1'
        }

        UPDATE_AND_EXPECT((data) => {
            return Object.assign(data, { source: s })
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