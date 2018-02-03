const boom = require('boom');

const register = async function ({
	query: {
		userName,
	},
}, res) {
	try {
		return {
			name: userName,
		};
	} catch (error) {
		const errorMessage = 'API Failed';
		return res(boom.boomify(error, { statusCode: 500, message: errorMessage }));
	}
};

module.exports = {
	register,
};
