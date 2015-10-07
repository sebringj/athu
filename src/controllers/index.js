var express = require('express');
var router = express.Router();
var api = require('./api');

router.get('/', function(req, res) {
	res.render('index.html', {});
});
router.use('/api', )

module.exports = router;
