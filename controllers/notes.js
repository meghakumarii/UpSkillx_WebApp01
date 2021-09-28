const {notes}=require('../models/notes')

const getnotes=(req,res)=>{
    res.send("all notes are here")
}

const getsinglenote=(req,res)=>{
    res.json({id:req.params.id})
}

const createnote=async(req,res)=>{
    console.log(req.body)
    await notes.create(req.body,(err)=>{if(err){console.log(err)}})
    //only creates and stores data in mongo db 
    res.status(200).json(req.body)
}

const updatenote=(req,res)=>{
    res.json({id:req.params.id})
}

const deletenote=(req,res)=>{
    res.send("delete note")
}

module.exports={
    getnotes,
    getsinglenote,
    createnote,
    updatenote
    ,deletenote
}