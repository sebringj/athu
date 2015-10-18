'use strict';

let jwt = require('./jwt');
let config = require('config');
let passport = require('passport');

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
        let referrer = config.referrers[req.get('Referrer')];
        if (!referrer) {
          res.status(400).send('bad rererrer');
          return;
        }
        req.session.referrer = referrer;
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
      req.session.destroy();
      passport.authenticate(options.authenticate, function(err, profile, info) {
        if (err || !profile) {
          res.redirect(referrer.errorRedirect);
          return;
        }
        let jwtToken = jwt.getToken({
          profile, secret: referrer.secret
        });
        res.redirect(referrer.successRedirect + '?jwt=' + jwtToken);
      })(req, res, next);
    });

  }
};
