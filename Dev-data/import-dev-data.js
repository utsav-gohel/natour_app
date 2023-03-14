const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const TourModel = require("../Model/tourModel");
const dotenv = require("dotenv");
const Tour = require("../Model/tourModel");
// console.log(dotenv.config({ path: "../config.env" }));
dotenv.config({ path: "../config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("Connected with Database"));

//Read JSON file
const tourFile = JSON.parse(fs.readFileSync("tour-simple.json", "utf-8"));

// console.log(tourFile);

const importData = async () => {
  try {
    await TourModel.create(tourFile);
    console.log("Data Created");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await TourModel.deleteMany();
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else {
  deleteData();
}

console.log(process.argv[2]);
