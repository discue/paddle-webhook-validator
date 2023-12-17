module.exports = function () {
    let code
    let response
    return {
        getStatusCode: () => code,
        getResponseBody: () => response,
        status: function (statusCode) {
            code = statusCode
            return {
                send: function (responseBody) {
                    response = responseBody
                }
            }
        }
    }
}