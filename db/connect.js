const mongoose=require('mongoose')  //npm package for connecting and operating with mongodb

//connecting app to my database
const connectdb=(url)=>{
return mongoose.connect(url)
}

module.exports={connectdb}