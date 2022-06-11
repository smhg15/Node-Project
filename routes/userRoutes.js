const express = require('express');
const jwt = require("jsonwebtoken")
const {signUpController,loginController} = require('../controllers/userControllers');

const app = express.Router();

app.post("/testlogin",(req,res)=>{

  try{
    const {JWT_TOKEN} = req.cookies
    const {token} = req.body
    if(token || JWT_TOKEN){  
        if(token == JWT_TOKEN){}      
        const decoded_token = jwt.verify(token||JWT_TOKEN,"key")
        if(decoded_token){
          res.send("user is verified")
        }else{
          res.send("Unable to authenticate user, please try again")
        }
  
    }else{
      res.status(400).send("invalid parameters")
      return;
    }
  }catch(e){
    res.status(400).send("Unable to authenticate user, please try again")
    return;
  }



})

app.post("/signup", signUpController)

app.post("/login", loginController)


module.exports = app;