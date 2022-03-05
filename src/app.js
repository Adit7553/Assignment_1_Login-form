const express = require("express");
require("./db/conn")
const User = require("./models/usermsg")
const newUser = require("./models/regmsg")
const path = require("path");
const bcrypt = require("bcrypt")
const hbs = require("hbs")
const app = express()

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
app.get("/error", (req,res)=>{
    res.render('error')
})
 app.get("/signup", (req,res)=>{
   res.render('signup')
})
app.get("/register", (req,res)=>{
    res.render('register')
 })


app.post("/", async (req,res)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const email = req.body.email
        const password = hashedPassword

        const useremail = await newUser.findOne({email:email})
             if(await bcrypt.compare(req.body.password, useremail.password)) {
                res.render("register")
             } else{
                res.status(504).send("invalid password or email")
             }
    } catch (error) {
        res.status(501).render('error')
    }
})
app.post("/newuse", async (req,res)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const registerdUser = new newUser({
               email : req.body.email,
               mobile : req.body.mobile,
               password : hashedPassword 
            })
            const regsuser = await registerdUser.save();
            res.status(200).render("newuse")
    } catch (error) {
        res.status(405).render('error')
    }
})


app.listen(PORT, ()=>{
    console.log(`Listning on port ${PORT}`)
});


