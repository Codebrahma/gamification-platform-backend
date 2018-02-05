const boom = require('boom');

const getUserByUserName = (Model, { userName }) => (
	Model
		.findOne({ userName })
		.then(response => response)
		.catch((error) => {
			const errorMessage = 'Data Base error';
			return boom.boomify(error, {
				statusCode: 500,
				message: errorMessage,
			});
		})
);

module.exports = getUserByUserName;

