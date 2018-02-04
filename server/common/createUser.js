const boom = require('boom');

const createUser = (Model, args) => {
	const user = new Model(args);
	return user
		.save()
		.then(response => response)
		.catch((error) => {
			const errorMessage = 'Data Base error';
			return boom.boomify(error, {
				statusCode: 500,
				message: errorMessage,
			});
		});
};

module.exports = createUser;
