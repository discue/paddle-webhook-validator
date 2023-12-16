'use strict'

const validator = require('../../../lib/classic/services/schema-validator')(['sandbox-my.paddle.com'], ['paddle.com'])

const { expect } = require('chai')

describe('SchemaValidator', () => {

    let data

    const UPDATE_AND_EXPECT = (callback, expectation) => {
        const newData = callback(data)
        const isValid = validator(newData)
        expect(isValid).to.equal(expectation)
    }

    it('returns false if no schema is available for alert_name', () => {
        UPDATE_AND_EXPECT(() => { return { alert_name: 'unknown' } }, false)
    })

    it('returns false if alert_name is missing', () => {
        UPDATE_AND_EXPECT(() => { return {} }, false)
    })
})