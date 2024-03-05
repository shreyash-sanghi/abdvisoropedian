const express = require("express");
const router = express();
const Register = require("../models/register")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Sign Up 
router.post("/signup",async(req,res)=>{
 try {
    const {Name , Email,Password } = req.body;
     await Register.create({
        Name , Email,Password
    })
    res.sendStatus(202);
 } catch (error) {
    res.status(404).send(error);
 }
})

//Login
router.post("/login",async(req,res)=>{
    try {
        const {Email,Password} = req.body;
        const result = await Register.findOne({Email});
        // console.log(result)
        if(result!=null){
            const UserPassword = result.Password;
            const id = result._id;
            const Name = result.Name;
          const check = await bcrypt.compare(Password,UserPassword);
          if(check === true){
            const Token = jwt.sign({_id:id},process.env.Sectet_Key1);
            res.status(202).json({Token,Name})
          }
          else{
            res.status(404).send("Invalid Password...")
          }
        }
        else{
            res.sendStatus(404);
        }
    } catch (error) {
        res.sendStatus(404);

    }
})

//Post List
router.get("/postlist",async(req,res)=>{
    try {
      const Token = req.header('Authorization');
      const varifyUser = jwt.verify(Token,process.env.Sectet_Key1);
        const user = await Register.findOne({_id:varifyUser._id});
        res.status(202).json({Name:user.Name});
    } catch (error) {
        res.status(404).send(error);
    }
})

module.exports = router;