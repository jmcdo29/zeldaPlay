import express, { static } from "express";
import { json } from "body-parser";
import path from "path";
//const db = require('./db/index');

const PORT = process.env.PORT || 4200;

const app = express();

app.use(json());
app.use(static(__dirname+ "/dist/"));



app.get("*", (req, res, next) => {
  res.sendFile('./index.html');
});

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
