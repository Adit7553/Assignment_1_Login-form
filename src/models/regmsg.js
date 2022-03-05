const async = require("hbs/lib/async");
const mongoose = require("mongoose");
//const bcrypt = require("bcryptjs");


const newuserSchema = mongoose.Schema({
    email : {
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
    }
})

//Now we create a collection

const newUser = mongoose.model("Registered" , newuserSchema);

//now we export this variable

module.exports = newUser;