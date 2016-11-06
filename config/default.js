'use strict';

/*
See EXAMPLE_ENV for setting env vars
*/

// construct HTTP referrer lookup
let referrerNames = process.env.REFERRER_NAMES.split(',');
let referrers = {};
for (let referrerName of referrerNames) {
  let key = referrerName.trim();
  let referrerKey = referrerNames['REFERRER_' + key + '_URL'];
  referrers[key] = {
    errorRedirect: referrerNames['REFERRER_' + key + '_ERROR_REDIRECT'],
    successRedirect: referrerNames['REFERRER_' + key + '_SUCCESS_REDIRECT'],
    secret: referrerNames['REFERRER_' + key + '_JWT_SECRET'],
    issuer: referrerNames['REFERRER_' + key + '_ISSUER']
  };
}

module.exports = {
  port: process.env.PORT,
  websiteRootAddress: process.env.WEBSITE_ROOT_URL,
  sessionSecret: process.env.SESSION_SECRET,
  sslPort: process.env.SSL_PORT,
  sslKey: process.env.SSL_KEY,
  sslCert: process.env.SSL_CERT,
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
      /* authenticate: 'google-oauth2' // set when passport authenticate name is different */
    },
  },
  // generated from above, see EXAMPLE_ENV for setting env vars
  referrers
};
