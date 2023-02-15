const express = require('express')
const router = express.Router();
const {index} = require('../contollers/controller')

router.get('/', index)

module.exports = router;