require('dotenv').config()

const config = require('config')
const express = require('express')
const favicon = require('serve-favicon')
const app = express()
const passport = require('passport')
const passportHelper = require('./utils/passport')
const session = require('express-session')

const lex = require('letsencrypt-express').create({
  server: 'production',
  email: config.letsEncrypt.email,
  agreeTos: true,
  approveDomains: [config.websiteDomain]
});

app.use(session({
  name: 'app.sid',
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: true,
  store: new session.MemoryStore()
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'))
app.use(favicon(__dirname + '/../public/favicon.ico'))

for (let provider of Object.keys(config.providers)) {
  let settings = config.providers[provider];
  passportHelper.setProvider({
    app, provider, authenticate: settings.authenticate, Strategy: settings.Strategy
  })
}

if (config.port) {
  require('http').createServer(app).listen(config.port, function() {
    console.log('listening on port ' + this.address().port)
  })
} else {
  require('http').createServer(lex.middleware(require('redirect-https')())).listen(80, function () {
    console.log('Listening for ACME http-01 challenges on', this.address())
  })
  require('https').createServer(lex.httpsOptions, lex.middleware(app)).listen(443, function () {
    console.log('Listening for ACME tls-sni-01 challenges and serve app on', this.address())
  })
}
