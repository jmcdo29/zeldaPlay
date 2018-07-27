const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname , '../v1/')));

app.get('*', (req, res, next) => {
  res.sendFile('./index.html');
});

module.exports.v1 = app;