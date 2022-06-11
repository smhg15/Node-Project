const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  username : String,
  password : String,
  email : String,
  token : {
    
  }
},{
  timestamps : true
})

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel