const express=require('express')
const app=express()

const path=require('path')

const user=path.resolve('User.html')

app.use(express.urlencoded({extended:false}))

app.use(express.static('./public'))

app.get('/',(req,res)=>{
    console.log("user hit server")
    res.send("Welcome to note making application");
})


app.get('/user',(req,res)=>{
    res.sendFile(user)
})


app.post('/note',(req,res)=>{
      console.log(req.body)
      res.send('your first note created')
})

app.listen('3000',()=>{
    console.log('app running on port 3000')
})
