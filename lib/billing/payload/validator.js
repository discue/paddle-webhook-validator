'use strict'

/**
 * @callback ValidationFunction
 * @param {import('express').Request} req
 * @returns {boolean}
 */

/**
 * @returns {ValidationFunction}
 */
module.exports.factory = function () {

    /**
     * @returns {Promise.<boolean>}
     */
    return async function validate() {
        return true
    }
}