var express = require("express");
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var fs = require('fs');
var Promise = require('promise');
var app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

var mime = {
  html: 'text/html',
  txt: 'text/plain',
  css: 'text/css',
  gif: 'image/gif',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  js: 'application/javascript',
  ttf: 'application/octet-stream',
  woff: 'application/octet-stream',
  woff2: 'application/octet-stream',
  less: 'stylesheet/less'
};

app.get('*', function (req, res) {
  if (!mime[path.extname(req.path).slice(1)]) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
  } else {
    var requestedURL = req.path;
    if (req.path.indexOf('bower_components') >= 0) {
      var dir = path.join(__dirname, 'bower_components');
      requestedURL = requestedURL.replace('/bower_components', '');
    } else {
      var dir = path.join(__dirname, 'public');
    }
    var file = path.join(dir, requestedURL);
    var s = fs.createReadStream(file);
    s.on('open', function () {
      res.setHeader('Cache-Control', 'public, max-age=31557600');
      res.set('Content-Type', mime[path.extname(requestedURL).slice(1)]);
      s.pipe(res);
    });
    s.on('error', function () {
      res.set('Content-Type', 'text/plain');
      res.status(404).end('Not found');
    });
  }
});
app.listen(port, function () {
  console.log("Listening on " + port);
});