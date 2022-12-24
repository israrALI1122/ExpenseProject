const express = require("express")
const app = express();
const cors = require('cors');

require('dotenv').config({path:"./config.env"})

const port = process.env.PORT || 5000;


//use middleware
app.use(cors())
app.use(express.json());


//using routes
app.use(require('./routes/route'))


//mongo db connection 
const con = require('./db/connection.js')

con.then(db =>{
    if(!db) return process.exit(1)

    // listen to the http server 
    app.listen(port , ()=>{
        console.log(`server is running on port:${port }`);
    })


    app.on('error', err=> console.log(`feild to connect with ttp server  ${err}` ))

    //error in mongo db connection 


}).catch(error =>{
    console.log(`connection error ${error}`);
})





