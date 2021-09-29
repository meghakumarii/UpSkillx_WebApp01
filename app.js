const {connectdb}=require('./db/connect')  //connecting app to MongoDb database

const express=require('express')  
const morgan = require('morgan')  
const app=express()

require('dotenv').config()   

const notes=require('./routes/notes')  

const port=process.env.PORT ||3000;

app.use(express.static('./public'))      //setting up static folder containing static files
app.use(express.urlencoded({extended:false}))  //useful for accesing info when user posts note
app.use(morgan('tiny'))  //middleware providing info about request.
app.use(express.json())  // data can be converted to json

app.use('/api/v1/notes',notes)  //creating route for CRUD operations

app.get('/',(req,res)=>{

    res.status(200).send("Welcome to Note making server")
})

//first connection to database is made and then server starts to listen
const start=async()=>{
   try {
       await connectdb(process.env.MONGOURI).then(()=>console.log("connection to mongodb succesful"))
       app.listen(port,console.log(`server is running on port ${port}`))
   } catch (error) {
       console.log(error)
   }
}

start()
