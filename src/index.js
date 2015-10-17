'use strict';

var config = require('config');
var express = require('express');
var favicon = require('serve-favicon');
var app = express();
var port = process.env.PORT || config.port || 3000;
var passport = require('passport');
var passportHelper = require('./utils/passport');

app.use(express.session({ secret: config.sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(favicon(__dirname + '/../public/favicon.ico'));

var providers = {
  google: { Strategy: require('passport-google-oauth').OAuth2Strategy },
  facebook: { Strategy: require('passport-facebook').Strategy },
  dropbox: { authenticate: 'dropbox-oauth2', Strategy: require('passport-dropbox-oauth2').Strategy },
  twitter: { Strategy: require('passport-twitter').Strategy },
  github: { Strategy: require('passport-github').Strategy },
  instagram: { Strategy: require('passport-instagram').Strategy },
  reddit: { Strategy: require('passport-reddit').Strategy }
};

for (let provider of Object.keys(providers)) {
  passportHelper.setProvider({
    app
    provider: provider,
    authenticate: providers[key].authenticate,
    Strategy: providers[key].Strategy
  });
}

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('athu.io listening at http(s)://%s:%s', host, port);
});
