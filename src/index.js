var config = require('config');
var express = require('express');
var favicon = require('serve-favicon');
var nunjucks = require('nunjucks');
var app = express();
var port = process.env.PORT || config.port || 3000;

nunjucks.configure('src/views', {
    autoescape: true,
    express: app
});

app.use('/', require('./controllers'));
app.use(express.static('public'));
app.use(favicon(__dirname + '/../public/favicon.ico'));

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('athu.io listening at http(s)://%s:%s', host, port);
});
