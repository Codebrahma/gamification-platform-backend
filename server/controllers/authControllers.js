const User = require('../../db/schema/userSchema');

exports.registration = function (req, res, next) {
	const { userName, email, password } = req.body;

	const user = new User({
		userName,
		email,
		password,
	});

	user.save().then(newUser => res.json(newUser)).catch(next);
};
