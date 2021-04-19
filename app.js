const app = require('express')()
// LOAD ENV FILE START ==================================================
global.absolutePath = __dirname
if (!process.env.NODE_ENV) require('dotenv').config({
  path: absolutePath + '/.env'
})
// LOAD ENV FILE END ====================================================')

// GLOBAL DEPENDENCIES START ============================================
global.q = require('q')
global.moment = require('moment')
global._ = require('underscore')
const Validator = require('jsonschema').Validator
global.v = new Validator()
// GLOBAL DEPENDENCIES END ==============================================

// LOCAL DEPENDENCIES START==============================================
const bodyParser = require('body-parser')
const constants = require('./config/constant.json')
const config = require('./config')
const BASE_URL = constants.BASE_URL
const v1Routes = require('./app/v1Router')
// LOCAL DEPENDENCIES END ===============================================

// APP.USE START ==========================================================
app.use(bodyParser.json({
  limit: '1mb'
}))
// FOR ERROR HANDLING
app.use(function (err, req, res, next) {
  res.status(400).send({
    status: 400,
    message: 'Bad request',
    error: err
  })
})
// APP.USE END ==========================================================

// ============ SERVING APIs START ============
// ============ VERSION WISE ROUTE CONTROL START ============
app.use(v1Routes)
// ============ VERSION WISE ROUTE CONTROL END ============
app.get(BASE_URL + '/ping', function (req, res) {
  res.status(200).send('pong')
})
// ON NO ROUTE MATCH
app.get('*', function (req, res) {
  res.status(404).send('404 PAGE not found >' + req.url + '<<')
})
// ============ SERVING APIs END ============

// SERVER PORT SECTION START =======================================
let port = config.port
let server = app.listen(port)
let environment = process.env.NODE_ENV
server.timeout = 3600000

console.log('API is running on port ', '\x1b[34m' + port + '\x1b[0m', ' in', '\x1b[33m' + environment + '\x1b[0m', 'environment')
console.log('curl http://localhost:' + port + BASE_URL + '/ping')