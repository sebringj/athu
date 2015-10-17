'use strict';

var jwt = require('./jwt');
var config = require('config');
var passport = require('passport');

module.exports = {
  setProvider: function(options) {

    options.authenticate = options.authenticate || options.provider;

    passport.use(new options.Strategy(config.providers[options.provider], function() {
      var args = Array.prototype.slice.call(arguments);
      var profile = args[args.length - 2];
      var done = args[args.length - 1];
      return done(null, {
        id: profile.id,
        provider: options.provider
      });
    }));

    app.get(
      '/auth/' + provider,
      function setRedirect(req, res, next) {
        var referer = config.referers[req.headers.referer];
        if (!referer) {
          res.status(400).send('bad request');
          return;
        }
        req.session.referer = referer;
        next();
      },
      passport.authenticate(options.authenticate, options.options)
    );

    app.get('/auth/' + provider + '/callback', function(req, res, next) {
      if (!req.session.referer) {
        res.status(400).send('bad request');
        return;
      }
      passport.authenticate(options.authenticate, function(err, profile, info) {
        var referer = req.session.referer;
        req.session.destroy();
        if (err || !profile) {
          res.redirect(referer.errorRedirect);
          return;
        }
        res.redirect(referer.successRedirect + '?jwt=' + jwt.getToken(profile));
      })(req, res, next);
    });

  }
};
