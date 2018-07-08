require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');

const PORT = process.env.PORT;

const app = express();

app.use(bodyparser.json());
app.use(express.static(__dirname + "/dist/"));

app.get("*", (req, res, next) => {
  res.sendFile('./index.html');
});

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
