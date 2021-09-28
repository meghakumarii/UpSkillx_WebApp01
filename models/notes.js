const mongoose=require('mongoose')


//creating a schema for each document in mongodb
const note_Schema=new mongoose.Schema({
    
    note:{
        type:String,
        required:[true,'must provide a note'],
        trim:true,
        maxlength:[500,'note cannot exceed hundred charachters']
    },
    completed:{
        type:Boolean,
        default:false
    }
})

//creating a model(or collection in mongodb)
const notes=mongoose.model('note',note_Schema)
module.exports={notes}