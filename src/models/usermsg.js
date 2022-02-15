const mongoose = require("mongoose");
const validator  = require("validator");
const bcrypt = require("bcryptjs");
const async = require("hbs/lib/async");

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

userSchema.pre("save", async function(next){

    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    
    next();
});


//Now we create a collection

const User = mongoose.model("Logind", userSchema);
//const newUser = mongoose.model("Registered" , newuserSchema);

//now we export this variable
module.exports = User;
//module.exports = newUser;