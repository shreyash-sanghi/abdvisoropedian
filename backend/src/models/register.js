const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const Register = new mongoose.Schema({
    Name:{
        type:String
    },
    Email:{
        type:String,
        required:true,
        unique:true,
    },
    Password:{
        type:String,
        required:true
    }
})

//bscript password
Register.pre("save",async function(next){
    if(this.isModified("Password")){
    this.Password = await bcrypt.hash(this.Password,10);
    }
    next();
})

const register = new mongoose.model("RegisterData",Register);
module.exports = register;