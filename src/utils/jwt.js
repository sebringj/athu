'use strict';

var jwtConfig = require('config').jwt;
var jwt = require('jsonwebtoken');

module.exports = {
	getToken: function (user) {
		return jwt.sign(user, jwtConfig.secret, jwtConfig.options);
	}
};
