const mongoose = require("mongoose");

const blogSchema2 = new mongoose.Schema({
  
  username:{
    type: String
  },
  password:{
    type: String,
  }

});

const blog2 = new mongoose.model("usercollections", blogSchema2);

module.exports = blog2;