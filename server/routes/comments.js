const express = require('express');
const router  = express.Router();
const Comment = require('../models/Comments')
const Videos = require('../models/Videos')

// router.get('/:id',(req,res)=>{
//    Comment.findById(videoId)
//    .then(comment=>{
    
//     res.json(comment)
// }) 
   
// })

router.get('/:id',(req,res)=>{
    Comment.findById(videoId)
    .then(comment=>{
        console.log(comment)
     Videos.populate(comment,{ path:'commment', populate: { path: 'author' }} )
     .then(list=>
     res.json(list))
 }) 
    
 })

router.post('/',(req,res,next)=>{
    const{videoId,comment,author}=req.body;
    Comment.create({videoId,comment,author})
    .then(comment =>{
        Videos.findByIdAndUpdate(videoId, {$push: { commment :  comment._id}}, {new: true})
        .then(corto => {
            Videos.populate(corto, { path:'commment', populate: { path: 'author' }})
            .then(cortoObj=>{
                return res.status(200).json(cortoObj)
            })
        })
    })

    .catch(err =>{
        console.log(err)
        next(err)
    });
})

module.exports= router;
