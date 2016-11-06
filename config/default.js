'use strict';

/*
See EXAMPLE_ENV for setting env vars
*/

// construct HTTP referrer lookup
let referrerNames = process.env.REFERRER_NAMES.split(',');
let referrers = {};
for (let referrerName of referrerNames) {
  let key = referrerName.trim();
  let prefix = 'REFERRER_' + key;
  referrers[key] = {
    errorRedirect: process.env[prefix + '_ERROR_REDIRECT'],
    successRedirect: process.env[prefix + '_SUCCESS_REDIRECT'],
    secret: process.env[prefix + '_JWT_SECRET'],
    issuer: process.env[prefix + '_ISSUER'],
    audience: process.env[prefix + '_AUDIENCE']
  };
}

module.exports = {
  websiteDomain: process.env.WEBSITE_DOMAIN,
  sessionSecret: process.env.SESSION_SECRET,
  letsEncrypt: {
    email: process.env.LETSENCRYPT_EMAIL
  },
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
      scope: ['profile', 'email'],
      /* authenticate: 'google-oauth2' // set when passport authenticate name is different */
    },
  },
  // generated from above, see EXAMPLE_ENV for setting env vars
  referrers
};
