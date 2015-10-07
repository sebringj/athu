
module.exports = {
	jwt: {
		secret: process.env.JWT_SECRET,
		options: {
			expiresInMinutes: 1440 // 24 hours
		}
	},
	providers: {
		google {
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL
		}
	}
};
