const User = require('../../db/schema/userSchema');

exports.registration = function (req, res, next) {
	const { userName, email, password } = req.body;
	if (!userName || !email || !password) {
		res.status(422).send({ error: 'Bad request. Request data invalid or missing.' });
	}

	User.findOne({ $or: [{ email }, { userName }] })
		.then((existingUser) => {
			if (existingUser) {
				return res.status(422).send({ error: 'That email address or username is already in use.' });
			}
			const user = new User({
				userName,
				email,
				password,
			});

			return user.save().then(newUser => res.json(newUser)).catch(next);
		});
};
