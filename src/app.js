const express = require("express");
require("./db/conn")
const User = require("./models/usermsg")
const newUser = require("./models/regmsg")
const path = require("path");
const hbs = require("hbs");
const app = express();

const PORT = process.env.PORT || 9000

const staticpath = path.join(__dirname, "../public");
const temppath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");

//set path for bootstrap,js and jquery
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')))
app.use('/jq', express.static(path.join(__dirname, '../node_modules/jquery/dist')))
app.use("/img", express.static(path.join(__dirname, '../public/images/2.jpg')))

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(express.static(staticpath))

app.set('view engine', "hbs");
app.set("views", temppath)
hbs.registerPartials(partialpath);


app.get("/", (req,res)=>{
    res.render('index')
})
app.get("/about", (req,res)=>{
    res.render('about')
})
app.get("/contact", (req,res)=>{
    res.render('contact')
})
app.get("/registration", (req,res)=>{
    res.render('registration')
})
app.get("/error", (req,res)=>{
    res.render('error')
})
 app.get("/signup", (req,res)=>{
   res.render('signup')
})
app.post("/", async (req,res)=>{
    try {
        const userData = new User(req.body);
      await userData.save();
        res.status(201).render('register');
    } catch (error) {
        res.status(501).render('error')
    }
})
app.post("/newuse", async (req,res)=>{
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;
         
         if(password === cpassword){

            const registerdUser = new newUser({
               name : req.body.name,
               mobile : req.body.mobile,
               password : req.body.password,
               cpassword : req.body.cpassword
               
            })
            const regsuser = await registerdUser.save();
            res.status(200).render("newuse")
         }else{
             res.send("password are not matching")
         }
    } catch (error) {
        res.status(405).render('error')
    }
})


app.listen(PORT, ()=>{
    console.log(`Listning on port ${PORT}`)
});


