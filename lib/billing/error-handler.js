'use strict'

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {String} error 
 */
module.exports = function (req, res) {
    res.status(400).send({
        status: '400',
        title: 'Bad Request',
    })
}