const express = require("express")
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")


require('dotenv').config({path:"./config.env"})

const port = process.env.PORT || 5000;


//use middleware
app.use(cors())
app.use(express.json());


//using routes
app.use(require('./routes/route'))


//mongo db connection 
const con = require('./db/connection.js')

//login and register 


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    tokens:[
        {
            token:{
                type: String,
                required:true
            }
        }
    ]
})

//we are generating 
userSchema.methods.generateAuthToken = async function (){
    try{

        let token = jwt.sign({_id: this._id}, process.env.SECREt_KEY)
        this.tokens = this.tokens.concat({token:token})
        this.save();
        return token;

    } catch (err){
        console.log(err);
    }
}


const User = new mongoose.model("User", userSchema)

//Routes
app.post("/login",  (req, res)=> {
    const { email, password} = req.body
    let token;
    User.findOne({ email: email}, (err, user) => {



        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
                token =  user.generateAuthToken()
                console.log(token);
               
                
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 

app.post("/register", (req, res)=> {
    const { name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 
















con.then(db =>{
    if(!db) return process.exit(1)

    // listen to the http server 
    app.listen(port , ()=>{
        console.log(`server is running on port:${port }`);
    })


    app.on('error', err=> console.log(`feild to connect with ttp server  ${err}` ))

    //error in mongo db connection 


}).catch(error =>{
    console.log(`connection error  ${error}`);
})





