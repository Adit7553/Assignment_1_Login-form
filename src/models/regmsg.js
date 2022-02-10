const mongoose = require("mongoose");


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

//Now we create a collection

const newUser = mongoose.model("Registered" , newuserSchema);

//now we export this variable

module.exports = newUser;