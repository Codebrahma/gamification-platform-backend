const boom = require('boom');
const UserModel = require('./registrationSchema');

/*
 * Register Function registers with userName, email, password
 */
const register = async function ({
	payload: {
		userName,
		email,
		password,
	},
}) {
	try {
		// Create a new instance of UserModel
		const currentUser = new UserModel({
			userName,
			email,
			password,
		});

		// Save the currentUser
		currentUser
			.save()
			.then(() => currentUser)
			.catch((error) => {
				const errorMessage = 'Data Base error';
				return boom.boomify(error, {
					statusCode: 500,
					message: errorMessage,
				});
			});

		// Return the currentUser
		return currentUser;
	} catch (error) {
		// Return if error
		const errorMessage = 'API Failed';
		return boom.boomify(error, {
			statusCode: 500,
			message: errorMessage,
		});
	}
};

module.exports = {
	register,
};
