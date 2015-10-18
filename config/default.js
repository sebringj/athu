'use strict';

module.exports = {
  websiteRootAddress: 'http://localhost:3000',
  sessionSecret: process.env.SESSION_SECRET,
  jwt: {
    expiresInMinutes: 1440 // 24 hours
  },

  // List passport-compatible providers installed and setup.
  // Note: callbackURL is set and determined by the app.
  providers: {
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      Strategy: require('passport-google-oauth').OAuth2Strategy,
      scope: ['profile']
    },
    /*
    facebook: {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      enableProof: false,
      Strategy: require('passport-facebook').Strategy
    },
    dropbox: {
      clientID: process.env.DROPBOX_CLIENT_ID,
      clientSecret: process.env.DROPBOX_CLIENT_SECRET,
      authenticate: 'dropbox-oauth2',
      Strategy: require('passport-dropbox-oauth2').Strategy
    },
    twitter: {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      Strategy: require('passport-twitter').Strategy
    },
    github: {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      Strategy: require('passport-github').Strategy
    },
    instagram: {
      clientID: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET
    },
    reddit: {
      clientID: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      Strategy: require('passport-instagram').Strategy
    },
    linkedin: {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      scope: ['r_emailaddress', 'r_basicprofile'],
      Strategy: require('passport-linkedin-oauth2').Strategy
    }
    */
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
