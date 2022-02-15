const async = require("hbs/lib/async");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const newuserSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    mobile :{
        type : String,
        required: false
    },
    password : {
        type : String,
        required :true
    },
    cpassword : {
        type: String,
        requiredPaths: true
    }
})

//hash password for security

newuserSchema.pre("save", async function(next){

    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
        this.cpassword = undefined;
    }
    
    next();
})

//Now we create a collection

const newUser = mongoose.model("Registered" , newuserSchema);

//now we export this variable

module.exports = newUser;