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
          
            const newVideo = {
                video: data.data.data.url,
                creator: data.data.data.author,
                description: data.data.data.description,
                cover: data.data.data.image.url
            };
            Video.create(newVideo)
            .then( object => res.json(object))
            .catch( e=>next (e))

            })
       }
    })
    .catch(error=>console.log(error))
})

module.exports = router;