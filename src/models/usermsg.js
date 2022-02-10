const mongoose = require("mongoose");
const validator  = require("validator");

//we define user schema and validation
const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error("invalid email id")
        //     }
        // }
    },
    password:{
        type: String,
        required:true
    }
});

// const newuserSchema = mongoose.Schema({
//     name : {
//         type: String,
//         required: true
//     },
//     mobile :{
//         type : String,
//         required: false
//     },
//     password : {
//         type : String,
//         required :true
//     },
//     cpassword : {
//         type: String,
//         requiredPaths: true
//     }
// })

//Now we create a collection

const User = mongoose.model("Logind", userSchema);
//const newUser = mongoose.model("Registered" , newuserSchema);

//now we export this variable
module.exports = User;
//module.exports = newUser;