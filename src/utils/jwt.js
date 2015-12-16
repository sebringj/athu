'use strict';

let jwtConfig = require('config').jwt;
let jwt = require('jsonwebtoken');
let _ = require('lodash');

module.exports = {
  getToken: function(options) {
    return new Promise(function(resolve, reject) {
      jwt.sign(
        options.profile,
        options.secret,
        _.assign({}, jwtConfig, { issuer: options.issuer }),
        resolve
      );
    });
  }
};
