const express = require('express');
const router = express.Router();
const Video = require('../models/Videos');
const Comment = require('../models/Comments');
const axios = require('axios');
const apiUrl = 'https://api.microlink.io?url=';


router.post('/new', (req, res, next) => {
	const { url,userId } = req.body;

	console.log(req.body.url);

	if (!url) {
		throw new Error('You must enter a URL');

};

	Video.findOne({ url })
		.then((foundVideo) => {
			if (foundVideo) throw new Error('Video already exits');
			else {
				axios.get(apiUrl + url).then((resp) => {
				

					const newVideo = {
            author:userId,
						video: resp.data.data.url,
						creator: resp.data.data.author,
						description: resp.data.data.description,
						cover: resp.data.data.image.url
					};

					Video.create(newVideo).then((object) => res.json(object)).catch((e) => next(e));
				});
			}
		})
		.catch((error) => console.log(error));
});
// Retrive DETAIL
router.get('/:id', (req, res, next) => {
	Video.findById(req.params.id)
	.populate('user')
	.then((object) => res.json(object)).catch((e) => next(e));
});

// Delete video
router.delete('/delete/:id', (req, res, next) => {
  
  Video.findById(req.params.id, function(err, video) {

    if (err)
      return next(new restify.InternalError(err));
    else if (!video)
      return next(new restify.ResourceNotFoundError('The resource you requested could not be found.'));
  
    
    Comment.find({VideoId: video._id}).remove().exec();
    
    
    video.remove();
  
    res.send({id: req.params.video_id});
  
  });
});

// GET User videos
router.get("/user/:id", (req, res, next) => {

    Video.find({author:req.params.id})
    .then(object => res.json(object))
    .catch(e => next(e));
});
// Retrive DETAIL
router.get("/:id", (req, res, next) => {
    Video.findById(req.params.id)
    .then(object => res.json(object))
    .catch(e => next(e));
});


// Retrive ALL
router.get("/", (req, res, next) => {

	var desde =req.query.desde || 0;
	desde=Number(desde);

	Video.find({})
	.skip(desde)
	.limit(3)
	.populate('commment')
	.populate('author')
	.populate({ path:'commment', populate: { path: 'author' }})
	.exec((err,videos) => {
		if(err){
			return res.status(500).json({
				ok:false,
				mensaje:'Error cargando Videos',
				errors:err
			});
		}
		Video.estimatedDocumentCount({ },(err,cont)=>{
			res.status(200).json({
				ok:true,
				videos:videos,
				total:cont
			});
		})
	
	});

  });



//LIKES
router.post('/:id/like', (req, res, next) => {
	const newLike= 1;
	Video.findByIdAndUpdate(req.params.id, { $inc: { like: newLike } })
	  .then(userVideo => {
		let currentLike = userVideo.like;
		currentLike += newLike;
		return res.status(200).json(userVideo);
	  })
	  .catch(e => {
		res.json(e);
		next(e);
	  });
  });
  
  //UNLIKE
  router.post('/:id/unlike', (req, res, next) => {
	const newUnlike = 1;
	Video.findByIdAndUpdate(req.params.id, { $inc: { unlike: newUnlike } })
	  .then(userVideo => {
		let currentUnlike = userVideo.unlike;
		currentUnlike += newUnlike;
		return res.status(200).json(userVideo);
	  })
	  .catch(e => {
		res.json(e);
		next(e);
	  });
  });

module.exports = router;