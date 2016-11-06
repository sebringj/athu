'use strict';

const config = require('config');
const express = require('express');
const favicon = require('serve-favicon');
const app = express();
const passport = require('passport');
const passportHelper = require('./utils/passport');
const session = require('express-session');

const lex = require('letsencrypt-express').create({
  // https://acme-v01.api.letsencrypt.org/directory
  server: 'staging',
  email: config.letsEncrypt.email,
  agreeTos: true,
  approveDomains: [config.websiteDomain]
});

app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(favicon(__dirname + '/../public/favicon.ico'));

for (let provider of Object.keys(config.providers)) {
  let settings = config.providers[provider];
  passportHelper.setProvider({
    app, provider, authenticate: settings.authenticate, Strategy: settings.Strategy
  });
}

require('http').createServer(lex.middleware(require('redirect-https')())).listen(80, function () {
  console.log('Listening for ACME http-01 challenges on', this.address());
});

require('https').createServer(lex.httpsOptions, lex.middleware(app)).listen(443, function () {
  console.log('Listening for ACME tls-sni-01 challenges and serve app on', this.address());
});
