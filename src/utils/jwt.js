'use strict';

let jwtConfig = require('config').jwt;
let jwt = require('jsonwebtoken');

module.exports = {
  getToken: function(options) {
    return jwt.sign(options.profile, options.secret, jwtConfig);
  }
};
