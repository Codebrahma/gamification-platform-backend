const boom = require('boom');
const UserModel = require('../../db/schema/userSchema');

const createUser = require('../common/createUser');

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
		return createUser(UserModel, {
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
