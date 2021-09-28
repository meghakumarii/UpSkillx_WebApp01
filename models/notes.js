const mongoose=require('mongoose')

const note_Schema=new mongoose.Schema({
    note:String,completed:Boolean
})
const notes=mongoose.model('note',note_Schema)
module.exports={notes}