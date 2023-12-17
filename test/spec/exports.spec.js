'use strict'

describe('Exports', () => {

    it('exports classic API as default', () => {
        require('@discue/paddle-webhook-validator')
    })
    it('exports classic API as /classic', () => {
        require('@discue/paddle-webhook-validator/classic')
    })
    it('exports billing API as /billing', () => {
        require('@discue/paddle-webhook-validator/billing')
    })
})