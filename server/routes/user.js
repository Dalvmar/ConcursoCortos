const express = require('express');
const router = express.Router();
const User = require('../models/User');

// All Users
router.get('/', (req, res, next) => {
	User.find().then((objects) => res.json(objects)).catch((e) => next(e));
});

// Details users
router.get('/:id', (req, res, next) => {
	User.findById(req.params.id).then((object) => res.json(object)).catch((e) => next(e));
});

// Edit User
router.put('/edit/:id', (req, res, next) => {
	
	User.findById(req.params.id).then(user => {
		const { username, name, lastname, email, paswword, category } = req.body;

	const updates = { username, name, lastname, email, paswword, category };
	
	User.findByIdAndUpdate(req.params.id, updates, { new: true })
		.then((object) => res.json(object))
		.catch((e) => next(e));
})
});

// Delete user
router.delete('/delete/:id', (req, res, next) => {
	User.findByIdAndRemove(req.params.id)
		.then(() => res.json({ message: `SUCESSFUL DELETE ${req.params.id}` }))
		.catch((e) => next(e));
});

module.exports = router;
