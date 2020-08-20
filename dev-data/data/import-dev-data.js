/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("./../../models/tourModel");
const Review = require("./../../models/reviewModel");
const User = require("./../../models/userModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {
    // console.log(con.connections);
    console.log("DB connection successful!");
  });

// Read the file

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, "utf-8"));
const tours = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, "utf-8"));

// import data into the database

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data Successfully loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//  Delete all data from DB COLLECTION

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data Successfully Deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

console.log(process.argv);
