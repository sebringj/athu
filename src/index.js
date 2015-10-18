'use strict';

let config = require('config');
let express = require('express');
let favicon = require('serve-favicon');
let app = express();
let port = process.env.PORT || config.port || 3000;
let passport = require('passport');
let passportHelper = require('./utils/passport');
let session = require('express-session');

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

let server = app.listen(port, function() {
  let host = server.address().address;
  let port = server.address().port;
  console.log('athu.io listening at http(s)://%s:%s', host, port);
});
