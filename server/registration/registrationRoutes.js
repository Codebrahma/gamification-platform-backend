const registrationHandler = require('./registrationHandler');

const API_PATH = '/api/1.0';

const routes = [];

routes.push({
	path: `${API_PATH}/registration`,
	method: 'GET',
	handler: registrationHandler.register,
});

module.exports = routes;
