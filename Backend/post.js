const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  description: String,
  imagePath: String,
  linkToNews: String,
  Date: String,
});
module.exports = mongoose.model("Post", postSchema);
