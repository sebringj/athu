'use strict';

module.exports = {
  websiteRootAddress: 'http://localhost:3000',
  sessionSecret: process.env.SESSION_SECRET,
  jwt: {
    expiresInMinutes: 1440 // 24 hours
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
      /* authenticate: 'google-oauth2' // if passport module name different */
    },
  },

  // List supported referrers here, you'll need the complete URL used in the referer.
  referrers: {
    'http://localhost:3001/': {
      errorRedirect: 'http://localhost:3001/error',
      successRedirect: 'http://localhost:3001/success',
      secret: process.env.LOCALHOST_SECRET
    }
  }
};
