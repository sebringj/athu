var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('../../../utils/jwt');

router.get('/google', passport.authenticate('google', { scope: 'profile' }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
		jwt.getWebToken(req.user)
  });
module.exports = router;
