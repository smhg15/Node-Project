const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const validator = require("validator")

const signUpController = async (req, res) => {  
  const { username, email, password } = req.body

  if (!validator.isEmail(email)) {
    res.status(400).send("invalid parameters")
    return
  }

  try {
    bcrypt.hash(password, 12, async (err, hash) => {
      if (err) {
        res.status(500).json("error hashing password")
      }
      const newUser = new User({username, password:hash})
      await newUser.save()  
      res.send("user created successfully")
    })
    

  }catch (e){
    res.status(500).send("something unexpected happened that prevents fulfilling the request.")
  }
  
}

const loginController = async (req,res) => {  
  const { username, password } = req.body
  try {
    const user = await User.find({username})
    if(user.length == 0 ){
      res.status(400).send("invalid username or password")
      return;
    }
    const storedPassword = user[0].password
    bcrypt.compare(password,storedPassword,(err)=>{
      if(err){
        res.status(400).send("Unable to authenticate user, please try again")
        return;
      }      
      const token = jwt.sign({
        password , username
      },"key")
      res.cookie("JWT_TOKEN",token)
      res.send({token})
    })
  }catch(e){
    res.status(500).send("something unexpected happened that prevents fulfilling the request.")
  }
}

module.exports = {
  signUpController,
  loginController
}