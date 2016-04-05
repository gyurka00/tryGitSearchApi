'use strict';

var express = require('express');

var app = express();

app.use(logRequest);
app.use(express.static('public'));

var port = parseInt(process.env.PORT || '3000');
app.listen(port, function () {
  console.log('Listening on port ' + port + '...');
});

function logRequest(req, res, next) {
  var parts = [
    new Date(),
    req.method,
    req.originalUrl,
  ];
  console.log(parts.join(' '));

  next();
}
