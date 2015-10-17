'use strict';

var config = require('config');
var express = require('express');
var favicon = require('serve-favicon');
var app = express();
var port = process.env.PORT || config.port || 3000;
var passport = require('passport');
var passportHelper = require('./utils/passport');

app.use(express.session({
  secret: config.sessionSecret
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(favicon(__dirname + '/../public/favicon.ico'));

for (let provider of Object.keys(config.providers)) {
  passportHelper.setProvider({
    app
    provider: provider,
    authenticate: providers[provider].authenticate,
    Strategy: providers[provider].Strategy
  });
}

var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('athu.io listening at http(s)://%s:%s', host, port);
});
