const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, ".env") });

const url = process.env.MONGO_URL;

const connectdb = async () => {
  try {
    await mongoose.connect(url);
    console.log("✅ DB connected successfully");
  } catch (error) {
    console.log({ message:`Db error ${error}`});
  }
};

module.exports = connectdb;
