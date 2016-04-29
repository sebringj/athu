'use strict';

let config = require('config');
let express = require('express');
let favicon = require('serve-favicon');
let app = express();
let passport = require('passport');
let passportHelper = require('./utils/passport');
let session = require('express-session');
let http = require('http');
let https = require('https');
let fs = require('fs');

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

if (config.sslPort)
  https.createServer({
    key: fs.readFileSync(config.sslKey),
    cert: fs.readFileSync(config.sslCert),
    ca: fs.readFileSync(config.sslCa)
  }, app).listen(config.sslPort);
else
  http.createServer(app).listen(config.port);
