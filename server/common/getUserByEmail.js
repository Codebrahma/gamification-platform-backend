const boom = require('boom');

const getUserByEmail = (Model, { email }) => (
	Model
		.findOne({ email })
		.then(response => response)
		.catch((error) => {
			const errorMessage = 'Data Base error';
			return boom.boomify(error, {
				statusCode: 500,
				message: errorMessage,
			});
		})
);

module.exports = getUserByEmail;

