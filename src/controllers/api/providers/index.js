var express = require('express');
var router = express.Router();

// list provider routing here
router.use('/google', require('./google'));
//router.use('/facebook', require('./facebook'));
//router.use('/github', require('./gibhub'));

module.exports = router;
