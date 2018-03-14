const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const db = require('./db/index');

const PORT = process.env.PORT || 4200;

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname+ "/dist/"));



app.get("*", (req, res, next) => {
  res.sendFile('./index.html');
});

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
