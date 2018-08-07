const express = require('express');
const router  = express.Router();
const Comment = require('../models/Comments')
const Cortos = require('../models/Cortos')

router.get('/:id',(req,res)=>{
   Comment.findById(videoId)
   .then(comment=>res.json(comment)) 
})

router.post('/',(req,res,next)=>{
    const{videoId,comment,author}=req.body;
    Comment.create({videoId,comment,author})
    .then(comment =>{
        Cortos.findByIdAndUpdate(videoId, {$push: { commment :  comment._id}})
        .then(corto => {
            Cortos.find().then(cortos=>{
                return res.status(200).json(cortos)
            })
        })
    })
    .catch(err =>{
        console.log(err)
        next(err)
    });
})

module.exports= router;
