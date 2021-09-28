const express=require('express')
const router=express.Router()
const {getnotes, 
    createnote, 
    getsinglenote,
     updatenote,
      deletenote}=require('../controllers/notes')

router.route('/').get(getnotes).post(createnote)   //get and post request with same url
router.route('/:id').get(getsinglenote).patch(updatenote).delete(deletenote) //get,patch,delete with same url

module.exports=router