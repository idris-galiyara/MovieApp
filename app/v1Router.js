const express = require('express')
const router = express.Router()
const constants = require('../config/constant.json')
const BASE_URL_V1 = constants.BASE_URL + constants.V1

router.get(BASE_URL_V1 + '/movie', require('./api/getmovies').getMovies)
module.exports = router