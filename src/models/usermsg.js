const mongoose = require("mongoose");
const validator  = require("validator");

//we define user schema and validation
const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email id")
            }
        }
    },
    password:{
        type: String,
        required:true
    }
});

//Now we create a collection

const User = mongoose.model("User", userSchema);

//now we export this variable
module.exports = User;