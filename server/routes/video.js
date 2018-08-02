const express = require('express');

const router = express.Router();
const Video = require('../models/Cortos');
const axios = require('axios');
const apiUrl = 'https://api.microlink.io?url='


router.post('/sendVideo',(req, res, next)=>{
    const { url } = req.body;
    console.log(apiUrl)
    if (!url) next(new Error('You must enter a URL'))

    Video.findOne({url}).then(foundVideo=>{
       if(foundVideo) throw new Error('Video already exits');
       else {
           axios.get(apiUrl+url).then(data => {
               console.log(data.data)


            })
       }
    })
    .catch(error=>console.log(error))
})

module.exports = router;