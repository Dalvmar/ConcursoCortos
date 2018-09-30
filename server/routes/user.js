const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcryptSalt = 10;
const bcrypt = require("bcrypt");
const Videos =require('../models/Videos')
const Comments =require('../models/Comments')

// All Users
router.get('/', (req, res, next) => {

	var desde =req.query.desde || 0;
	desde=Number(desde);

	User.find({})
	.skip(desde)
	.limit(5)
	.exec((err,users) => {
		if(err){
			return res.status(500).json({
				ok:false,
				mensaje:'Error cargando Usuario',
				errors:err
			});
		}
		User.estimatedDocumentCount ({ },(err,cont)=>{
			res.status(200).json({
				ok:true,
				users:users,
				total:cont
			});
		})
	
	});
 
});

// Details users
router.get('/:id', (req, res, next) => {
	User.findById(req.params.id).then((object) => res.json(object)).catch((e) => next(e));
});

// Edit User
router.put('/edit/:id', (req, res, next) => {
	username=req.body.user.username;
	name=req.body.user.name
	lastname=req.body.user.lastname
	category=req.body.user.category

	User.findById(req.params.id).then(user => {
		userDbPassword=user.password;
		

		const changeFields = new Promise((resolve, reject) => {
			if (!req.body.user.username || !req.body.user.name || !req.body.user.lastname || !req.body.user.category) {
				reject(new Error("Username ,name ,lastname ,category and email are required."));
			} else {
				resolve();

			}
		});
		
const changePassword = new Promise((resolve, reject) => {

	
	if ((req.body.oldpass !== "" && req.body.newpass === "") || (req.body.oldpass === "" && req.body.newpass !== "")) 
	{
       reject(new Error("If you want to change your password, you should fill both password fields."));
	} 
	else if(req.body.oldpass && req.body.newpass && !bcrypt.compareSync(req.body.oldpass,userDbPassword))
	{
		reject(new Error("Incorrect old password."));	
	}
	else
	{
		console.log('AQUI')
		resolve();
	}
		
  });


		changeFields.then(() => {
			console.log("changePASS")
			console.log(changePassword)
			return changePassword;
		})
			.then(() => {
			
				return User.findOne({ username, _id: { $ne: req.params.id } });
			})
			.then(user => { // Change password
			
				if (req.body.newpass && req.body.oldpass) {
					const salt = bcrypt.genSaltSync(bcryptSalt);
					const hashPass = bcrypt.hashSync(req.body.newpass, salt);
					return User.findByIdAndUpdate(req.params.id, { password: hashPass });
				}
			})
			.then(user => {
				if (user) {
					throw new Error('ohh username exists');
				}
				return User.findByIdAndUpdate(req.params.id, {
					username,
					name,
					lastname,
					category,
					
				}, {new:true});
			})
			.then(user => res.json(user))
			.catch(err => next(err));
	});
});
	
// Delete user
router.delete('/delete/:id', (req, res, next) => {
    
    User.findById(req.params.id, function(err, user) {

        if (err)
            return next(new restify.InternalError(err));
        else if (!user)
            return next(new restify.ResourceNotFoundError('The resource you requested could not be found.'));
    
        
        Comments.find({author: user._id}).remove().exec();
        Videos.find({author: user._id}).remove().exec();
        user.remove();
        res.send({id: req.params.user_id});
    
    });
});


// ADD ADMIN
router.post('/newAdmin', (req, res, next) => {

	const {username,password,name,lastname,email} = req.body;
  
	// Check for non empty user or password
	if (!username || !password || !email || !name || !lastname){
	  next(new Error('You must provide credentials'));
	  return;
	}
  
	// Check if user exists in DB
	User.findOne({ email })
	.then( foundEmail => {
	  if (foundEmail) throw new Error('Email already exists');
  		else{
	  const salt     = bcrypt.genSaltSync(10);
	  const hashPass = bcrypt.hashSync(password, salt);
  
	const newAdmin={
		username,
		name,
		lastname,
		password: hashPass,
		email,
		role: 'admin',
		category: '11-22 años España'
	};
	  User.create(newAdmin, {new:true}).then( (object) => res.json(object)).catch((e) => next(e));
	}
	
  })
  .catch((error) => console.log(error))

});

module.exports = router;
