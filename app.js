const {connectdb}=require('./db/connect')

const express=require('express')
const morgan = require('morgan')
const app=express()

require('dotenv').config()

const notes=require('./routes/notes')

const port=3000
app.use(express.static('./public'))
app.use(express.urlencoded({extended:false}))
app.use(morgan('tiny'))
app.use(express.json())

app.use('/api/v1/notes',notes)

app.get('/',(req,res)=>{

    res.status(200).send("Welcome to Note making server")
})
const start=async()=>{
   try {
       await connectdb(process.env.MONGOURI).then(()=>console.log("connection to mongodb succesful"))
       app.listen(port,console.log(`server is running on port ${port}`))
   } catch (error) {
       console.log(error)
   }
}

start()
