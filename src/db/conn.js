const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/test5", {
    useNewUrlParser:true,
    useUnifiedtopology:true
}).then(()=>{
    console.log("connection successfull");
}).catch((error)=>{
    console.log(`An error occurd , error: ${error}`);
})