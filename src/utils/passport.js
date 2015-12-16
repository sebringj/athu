'use strict';

let jwt = require('./jwt');
let config = require('config');
let passport = require('passport');
let url = require('url');
let _ = require('lodash');
let appendQuery = require('./appendQuery');

module.exports = {
  setProvider: function(options) {

    options.authenticate = options.authenticate || options.provider;

    let providerConfig = config.providers[options.provider];
    let providerAuthUrl = '/auth/' + options.provider;
    let providerCallbackUrl = providerAuthUrl + '/callback';
    providerConfig.callbackURL = config.websiteRootAddress + providerCallbackUrl;

    passport.use(new options.Strategy(config.providers[options.provider], function() {
      let args = Array.prototype.slice.call(arguments);
      let profile = args[args.length - 2];
      let done = args[args.length - 1];
      return done(null, {
        id: profile.id,
        provider: options.provider
      });
    }));

    options.app.get(
      providerAuthUrl,
      function setRedirect(req, res, next) {
        let referrerHeader = req.get('Referrer') || req.query.referrer;
        let referrer = config.referrers[referrerHeader];
        if (!referrer) {
          res.status(400).send('bad rererrer');
          return;
        }
        req.session.referrer = referrer;
        req.session.query = req.query;
        next();
      },
      passport.authenticate(options.authenticate, options.options)
    );

    options.app.get(providerCallbackUrl, function(req, res, next) {
      if (!req.session.referrer) {
        res.status(400).send('bad request');
        return;
      }

      let referrer = req.session.referrer;
      let query = req.session.query || {};
      req.session.destroy();

      passport.authenticate(options.authenticate, function(err, profile, info) {
        if (err || !profile) {
          res.redirect(appendQuery(referrer.errorRedirect, query));
          return;
        }

        jwt.getToken({ profile, secret: referrer.secret, issuer: options.issuer })
        .then(function(token) {
          query.jwt = token;
          res.redirect(appendQuery(referrer.successRedirect, query));
        })
        .catch(function(err) {
          console.error(err);
          res.redirect(appendQuery(referrer.errorRedirect, query));
        });

      })(req, res, next);
    });

  }
};
