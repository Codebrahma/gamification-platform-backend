const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../db/schema/userSchema');
const config = require('config');

const saltRounds = 8;

function generateToken(user) {
	return jwt.sign(user, config.get('app.token_secret'), {
		expiresIn: 604800, // in seconds
	});
}

exports.registration = function (req, res, next) {
	const { userName, email, password } = req.body;
	if (!userName || !email || !password) {
		res.status(422).send({ error: 'Bad request. Request data invalid or missing.' });
	}

	User.findOne({ $or: [{ email }, { userName }] })
		.then((existingUser) => {
			if (existingUser) {
				res.status(422).send({ error: 'That email address or username is already in use.' });
			} else {
				bcrypt.hash(password, saltRounds)
					.then((hash) => {
						const user = new User({
							userName,
							email,
							password: hash,
						});
						user.save().then(({ _id }) => res.json({ _id, userName, email })).catch(next);
					});
			}
		}).catch(next);
};

exports.login = function (req, res) {
	res.status(200).json({
		token: `${generateToken(req.body)}`,
		user: res.user,
	});
};
