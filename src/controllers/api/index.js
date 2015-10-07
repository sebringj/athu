var express = require('express');
var router = express.Router();
var providers = require('./providers');

router.use('/auth', providers);

module.exports = router;
