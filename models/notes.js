const mongoose=require('mongoose')

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
const notes=mongoose.model('note',note_Schema)
module.exports={notes}