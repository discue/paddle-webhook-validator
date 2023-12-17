module.exports = function ({ paddleSignature, body }) {
    return {
        headers: {
            'paddle-signature': paddleSignature
        },
        body
    }
}