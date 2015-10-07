var JwtStrategy = require('passport-jwt').Strategy;
var config = require('config');
var User = require('../models/user');

module.exports = function(passport) {
	var opts = { secretOrKey: config.get().jwtSecret };
	passport.use(new JwtStrategy(opts, function(jwt_paylaod, done) {
		User.findOne({_id: jwt_paylaod._id}, function(err, user) {
			if (err)
				return done(err, false);
			if (user) {
				done(null, user);
			} else {
				done(null, false);
					// or you could create a new account
			}
		});
	}));
};
