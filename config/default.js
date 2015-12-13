'use strict';

module.exports = {
  port: process.env.PORT,
  websiteRootAddress: process.env.WEBSITE_ROOT_ADDRESS,
  sessionSecret: process.env.SESSION_SECRET,
  ssl: (process.env.SSL === 'true'),
  jwt: {
    expiresInMinutes: 1440, // 24 hours
    issuer: 'athu'
  },

  // List passport-compatible providers installed and setup.
  // Note: callbackURL is set and determined by the app.
  // Link your "sign in with" button to http(s)://[athu host]/auth/[provider name]
  providers: {
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      Strategy: require('passport-google-oauth').OAuth2Strategy,
      scope: ['profile'],
      /* authenticate: 'google-oauth2' // if passport authenticate name is different */
    },
  },

  // List supported referrers here, you'll need the complete URL used in the referer.
  referrers: {
    'https://site1.com/': {
      errorRedirect: 'https://site1.com?athu=error',
      successRedirect: 'https://site2.com',
      secret: process.env.SITE1_SECRET
    },
    'https://site2.com/': {
      errorRedirect: 'https://site2.com?athu=error',
      successRedirect: 'https://site2.com',
      secret: process.env.SITE2_SECRET
    }
  }
};
