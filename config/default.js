'use strict';

module.exports = {
  sessionSecret: process.env.SESSION_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
    options: {
      expiresInMinutes: 1440 // 24 hours
    }
  },
  providers: {
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      Strategy: require('passport-google-oauth').OAuth2Strategy
    },
    facebook: {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      enableProof: false,
      Strategy: require('passport-facebook').Strategy
    },
    dropbox: {
      clientID: process.env.DROPBOX_CLIENT_ID,
      clientSecret: process.env.DROPBOX_CLIENT_SECRET,
      callbackURL: process.env.DROPBOX_CALLBACK_URL,
      authenticate: 'dropbox-oauth2',
      Strategy: require('passport-dropbox-oauth2').Strategy
    },
    twitter: {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: process.env.TWITTER_CONSUMER_CALLBACK_URL,
      Strategy: require('passport-twitter').Strategy
    },
    github: {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      Strategy: require('passport-github').Strategy
    },
    instagram: {
      clientID: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
      callbackURL: process.env.INSTAGRAM_CALLBACK_URL
    },
    reddit: {
      clientID: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      callbackURL: process.env.REDDIT_CALLBACK_URL,
      Strategy: require('passport-instagram').Strategy
    },
    linkedin: {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: process.env.LINKEDIN_CALLBACK_URL,
      scope: ['r_emailaddress', 'r_basicprofile'],
      Strategy: require('passport-linkedin-oauth2').Strategy
    }
  },
  referers: {
    localhost: {
      errorRedirect: '',
      successRedirect: ''
    }
  }
};
