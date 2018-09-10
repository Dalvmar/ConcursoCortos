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
 
	// router.get('/', (req, res, next) => {
	// 	User.find().then((objects) => res.json(objects)).catch((e) => next(e));
	
});

// Details users
router.get('/:id', (req, res, next) => {
	User.findById(req.params.id).then((object) => res.json(object)).catch((e) => next(e));
});

// Edit User
router.put('/edit/:id', (req, res, next) => {
	User.findById(req.params.id).then(user => {
		const { username, name, lastname, email, oldpassword, newpassword, category } = req.body;

		const changeFields = new Promise((resolve, reject) => {
			if (!username || !email || !name || !lastname || !category) {
				console.log("aqui")
				reject(new Error("Username ,name ,lastname and email are required."));
			} else {
				resolve();
			}
		});

		const changePassword = new Promise((resolve, reject) => {
			if ((oldpassword !== "" && newpassword === "") || (oldpassword === "" && newpaswword !== "")) {
				reject(new Error("You should fill both password fields"));
			} else if (oldpassword && newpassword && !bcrypt.compareSync(oldpassword, req.user.paswword)) {
				reject(new Error("Password incorrect"));
			} else {
				resolve();
			}
		});

		changeFields.then(() => {
			return changePassword;
		})
			.then(() => {
				return User.findOne({ username, _id: { $ne: req.params.id } });
			})
			.then(user => { // Change password
				if (oldpassword && newpassword) {
					const salt = bcrypt.genSaltSync(bcryptSalt);
					const hashPass = bcrypt.hashSync(newpassword, salt);
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
					email
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
