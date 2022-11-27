'use strict'

const SCHEMAS = [
    require('../schemas/subscription-created'),
    require('../schemas/subscription-updated'),
    require('../schemas/subscription-cancelled'),
    require('../schemas/subscription-payment-succeeded'),
    require('../schemas/subscription-payment-refunded'),
    require('../schemas/subscription-payment-failed'),
]

const MAX_200_CHARS = (target) => target.length <= 200

let allowedHttpHosts
let allowedHttpsHosts

/**
 * 
 * @param {Array<String>} httpHosts hostnames that are allowed in URIs
 * @param {Array<String>} httpsHosts hostnames that are allowed in URIs
 * @returns 
 */
module.exports = (httpHosts, httpsHosts) => {
    allowedHttpHosts = httpHosts
    allowedHttpsHosts = httpsHosts

    return validator
}

/**
 * 
 * @param {Object} data 
 * @returns {boolean} true if payload was validated, false otherwise
 */
const validator = (data) => {
    if (!data.alert_name) {
        return false
    }

    const name = data.alert_name
    const schema = SCHEMAS.find(schema => schema.properties.alert_name.default === name)

    if (!schema) {
        console.error(`Could not find a schema for alert ${name}. Therefore, I do accept this hook as valid.`)
        console.error(`In case you need validation support for this hook please open an issue or create a PR at https://github.com/discue/paddle-webhook-validator.`)
        return false
    }

    return Object.keys(data).every((key) => {
        const value = schema.properties[key]

        if (!value) {
            console.log(`Could not find a schema for property ${key}. This property will be deleted from the payload.`)
            return delete data[key]
        } else if (value.pattern) {
            return _matchPattern(data, key, value)

        } else if (value.format === 'uri') {
            return _validateUri(data, key)

        } else if (value.maxLength) {
            return _validateMaxLength(data, key, value)

        } else if (value.enum) {
            return _validateEnum(data, key, value)

        } else if (value.default) {
            return _validateDefaultValue(data, key, value)

        } else if (key === 'p_signature') {
            return IF_NOT_EMPTY(data[key], (target) => {
                return target.match(/^[a-zA-z0-9/=+]{0,2000}$/)
            })

        } else {
            return IF_NOT_EMPTY(data[key], MAX_200_CHARS)
        }
    })
}


/**
 * @callback ValidationCallback
 * @param {string} value
 */

/**
 * 
 * @param {*} value 
 * @param {ValidationCallback} callback 
 * @returns 
 */
const IF_NOT_EMPTY = (value, callback) => {
    if (value && typeof value !== 'string') {
        console.log(`${value} is not a string`)
        return false
    } else if (value) {
        return callback(String(value))
    } else {
        return true
    }
}

function _matchPattern(data, key, value) {
    return IF_NOT_EMPTY(data[key], (target) => {
        const matches = target.match(new RegExp('^' + value.pattern + '$'))
        if (!matches) {
            console.log(`${target} does not match pattern ${value.pattern}`)
        }
        return matches
    })
}

function _validateUri(data, key) {
    return IF_NOT_EMPTY(data[key], (target) => {
        let url
        try {
            url = new URL(target)
        } catch (e) {
            console.log(`${target} is not an url`)
            return false
        }
        let allowedHosts
        if (url.protocol === 'http:') {
            allowedHosts = allowedHttpHosts

        } else if (url.protocol === 'https:') {
            allowedHosts = allowedHttpsHosts

        } else {
            console.log(`Unknown protocol in ${target}`)
            return false
        }

        const found = allowedHosts.find(host => url.hostname.endsWith(host))
        if (!found) {
            console.log(`${url.hostname} not found in ${allowedHosts}`)
        }
        return found
    })
}

function _validateDefaultValue(data, key, value) {
    return IF_NOT_EMPTY(data[key], (target) => {
        const isDefault = target === value.default
        if (!isDefault) {
            console.log(`${target} is not equal to only allowed value ${data.default}`)
        }
        return isDefault
    })
}

function _validateMaxLength(data, key, value) {
    return IF_NOT_EMPTY(data[key], (target) => {
        const lengthOk = target.length <= value.maxLength
        if (!lengthOk) {
            console.log(`${target}'s length ${target.length} is longer than allowed ${value.maxLength}`)
        }
        return lengthOk
    })
}

function _validateEnum(data, key, value) {
    return IF_NOT_EMPTY(data[key], (target) => {
        const found = value.enum.filter(v => v == target).length === 1
        if (!found) {
            console.log(`${target} not found in ${value.enum}`)
        }
        return found
    })
}
