const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  
  srnumber:{
    type: String,
  }

});

const blog = new mongoose.model("collections", blogSchema);

module.exports = blog;
