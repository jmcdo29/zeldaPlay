const express = require('express');
//import express, { static } from "express";
const bodyparser = require('body-parser');
//import { json } from "body-parser";
const path = require('path');
//import path from "path";
//const db = require('./db/index');

const PORT = process.env.PORT || 4200;

const app = express();

app.use(bodyparser.json());
app.use(express.static(__dirname + "/dist/"));



app.get("*", (req, res, next) => {
  res.sendFile('./index.html');
});

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
