const boom = require('boom');
const UserModel = require('../schema/userSchema');

const handleDbError = error => boom.boomify(error, {
	statusCode: 500,
	message: 'Data Base error',
});

const createUser = args => new UserModel(args)
	.save()
	.then(response => response)
	.catch(handleDbError);

const getUserByEmail = ({ email }) => UserModel
	.findOne({ email })
	.then(response => response)
	.catch(handleDbError);

const getUserByUserName = ({ userName }) => UserModel
	.findOne({ userName })
	.then(response => response)
	.catch(handleDbError);

module.exports = {
	createUser,
	getUserByEmail,
	getUserByUserName,
};
