const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  ContentDetails: String,
  ProfileImage: String,
  CategoryName:String,
  CategoryId:String
});

module.exports = mongoose.model("Content",contentSchema);