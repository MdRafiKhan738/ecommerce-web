const express = require("express");
const mongoose = require("mongoose");

const url = "mongodb+srv://rafikhan:rafi123@cluster0.f2ybnn4.mongodb.net/";

const connectdb = async () => {
  try {
    await mongoose.connect(url);
    console.log("✅ DB connected successfully");
  } catch (error) {
    console.log({ dberror: error.message });
  }
};

module.exports = connectdb;
