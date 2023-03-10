const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

const app = require("./index");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("Connected with Database"));

// console.log(process.env);
PORT = process.env.PORT || 3000;

//SERVER
app.listen(PORT, () => {
  console.log("Server Started on ", PORT);
});
