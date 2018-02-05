const boom = require('boom');

const userDataAccess = require('../../db/dataaccess/user');

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
		return userDataAccess.createUser({
			userName,
			email,
			password,
		});
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
