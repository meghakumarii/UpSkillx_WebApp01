const express=require('express')
const router=express.Router()
const {getnotes, createnote, getsinglenote, updatenote, deletenote}=require('../controllers/notes')

router.route('/').get(getnotes).post(createnote)
router.route('/:id').get(getsinglenote).patch(updatenote).delete(deletenote)

module.exports=router