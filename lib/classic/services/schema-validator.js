'use strict'

const logger = require('../simple-logger')

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
        logger.error(`Could not find a schema for alert ${name}. Therefore, I do accept this hook as valid.`)
        logger.error(`In case you need validation support for this hook please open an issue or create a PR at https://github.com/discue/paddle-webhook-validator.`)
        return false
    }

    return Object.keys(data).every((key) => {
        const value = schema.properties[key]

        if (!value) {
            logger.info(`Could not find a schema for property ${key}. This property will be deleted from the payload.`)
            return delete data[key]
            
        } else if (value.pattern) {
            const matches = _matchPattern(data, key, value)
            if (!matches) {
                logger.error(`${data[key]} of key ${key} does not match pattern ${value.pattern}.`)
            }
            return matches

        } else if (value.format === 'uri') {
            const isUri = _validateUri(data, key)
            if (!isUri) {
                logger.error(`${data[key]} of key ${key} is not a valid URI pattern. Allowed http hosts are ${allowedHttpHosts}, allowed https hosts are ${allowedHttpsHosts}`)
            }
            return isUri

        } else if (value.maxLength) {
            const shorterThanMaxLength = _validateMaxLength(data, key, value)
            if (!shorterThanMaxLength) {
                logger.error(`${data[key]} of key ${key} is invalid because length is greater than ${value.maxLength}.`)
            }
            return shorterThanMaxLength

        } else if (value.enum) {
            const isOneOfEnumerations = _validateEnum(data, key, value)
            if (!isOneOfEnumerations) {
                logger.error(`${data[key]} of key ${key} is not one allowed enum values ${value.enum}.`)
            }
            return isOneOfEnumerations

        } else if (value.default) {
            const isDefaultValue = _validateDefaultValue(data, key, value)
            if (!isDefaultValue) {
                logger.error(`${data[key]} of key ${key} is not equal to default value ${value.default}.`)
            }
            return isDefaultValue
        
        } else if (key === 'p_signature') {
            return IF_NOT_EMPTY(data[key], (target) => {
                return target.match(/^[a-zA-z0-9/=+]{0,2000}$/)
            })

        } else {
            const isLengthOk = IF_NOT_EMPTY(data[key], MAX_200_CHARS)
            if (!isLengthOk) {
                logger.error(`${data[key]} of key ${key} is longer than 200 chars.`)
                return false
            }
            return isLengthOk
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
        logger.info(`${value} is not a string`)
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
            logger.info(`${target} does not match pattern ${value.pattern}`)
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
            logger.info(`${target} is not an url`)
            return false
        }
        let allowedHosts
        if (url.protocol === 'http:') {
            allowedHosts = allowedHttpHosts

        } else if (url.protocol === 'https:') {
            allowedHosts = allowedHttpsHosts

        } else {
            logger.info(`Unknown protocol in ${target}`)
            return false
        }

        const found = allowedHosts.find(host => url.hostname.endsWith(host))
        if (!found) {
            logger.info(`${url.hostname} not found in ${allowedHosts}`)
        }
        return found
    })
}

function _validateDefaultValue(data, key, value) {
    return IF_NOT_EMPTY(data[key], (target) => {
        return target === value.default
    })
}

function _validateMaxLength(data, key, value) {
    return IF_NOT_EMPTY(data[key], (target) => {
        return target.length <= value.maxLength
    })
}

function _validateEnum(data, key, value) {
    return IF_NOT_EMPTY(data[key], (target) => {
        return value.enum.filter(v => v == target).length === 1
    })
}
