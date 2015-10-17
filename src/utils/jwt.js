'use strict';

var jwtConfig = require('config').jwt;
var jwt = require('jsonwebtoken');

module.exports = {
  getToken: function(options) {
    return jwt.sign(options.profile, options.secret, jwtConfig);
  }
};
