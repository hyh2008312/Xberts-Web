var throng = require('throng');

var WORKERS = process.env.WEB_CONCURRENCY || 1;
var PORT = process.env.PORT || 5000;

throng({
  workers: WORKERS,
  lifetime: Infinity
}, start);

function start() {
  var gzippo = require('gzippo');
  var express = require('express');
  var morgan = require('morgan');
  var app = express();

  app.use(morgan('dev'));
  app.use('*', function(req, res, next) {
    var shouldRedirect = false;
    var host = req.get('Host');

    if (req.headers['x-forwarded-proto'] != 'https') {
      shouldRedirect = true;
    }

    if (shouldRedirect) {
      res.redirect(301, 'https://' + host + req.url);
    } else {
      next();
    }
  });
  app.use(gzippo.staticGzip('' + __dirname + '/dist'));
  app.use(function(req, res) {
    res.sendfile('dist/index.html');
  });

  app.listen(PORT, onListen);

  function onListen() {
    console.log('Listening on', PORT);
  }
}
