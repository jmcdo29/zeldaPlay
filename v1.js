const express = require('express');

const app = express();

app.use(express.static(__dirname + '/v1/'));

app.get('*', (req, res, next) => {
  res.sendFile('./index.html');
});

module.exports.v1 = app;