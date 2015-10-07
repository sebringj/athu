var FacebookStrategy = require('passport-facebook').Strategy;
var facebookConfig = require('config').providers.facebook;

module.exports = function(passport) {
	passport.use(new FacebookStrategy(facebookConfig, function(accessToken, refreshToken, profile, done) {
		return done(null, profile);
  }));
};
