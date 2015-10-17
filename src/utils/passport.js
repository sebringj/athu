'use strict';

let jwt = require('./jwt');
let config = require('config');
let passport = require('passport');

module.exports = {
  setProvider: function(options) {

    options.authenticate = options.authenticate || options.provider;

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
      '/auth/' + options.provider,
      function setRedirect(req, res, next) {
        let referrer = config.referrers[req.get('Referrer')];
        if (!referer) {
          res.status(400).send('bad request');
          return;
        }
        req.session.referrer = referer;
        next();
      },
      passport.authenticate(options.authenticate, options.options)
    );

    options.app.get('/auth/' + options.provider + '/callback', function(req, res, next) {
      if (!req.session.referrer) {
        res.status(400).send('bad request');
        return;
      }
      passport.authenticate(options.authenticate, function(err, profile, info) {
        let referrer = req.session.referrer;
        req.session.destroy();
        if (err || !profile) {
          res.redirect(referrer.errorRedirect);
          return;
        }
				let jwtToken = jwt.getToken({ profile, secret: referrer.secret });
        res.redirect(referer.successRedirect + '?jwt=' + jwtToken);
      })(req, res, next);
    });

  }
};
