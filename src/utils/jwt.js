var jwtConfig = require('config').jwt;
var jwt = require('jsonwebtoken');

module.exports = {
	getWebToken: function (user){
		return jwt.sign(user, jwtConfig.secret, jwtConfig.options);
	}
};
