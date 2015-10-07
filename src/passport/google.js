var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleConfig = require('config').providers.google;

module.exports = function(passport) {
	passport.use(new GoogleStrategy(googleConfig, function(accessToken, refreshToken, profile, done) {
		return done(null, {
			provider: 'google',
			id: profile.id
		});
	}));
};
