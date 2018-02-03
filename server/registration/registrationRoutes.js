const registrationHandler = require('./registrationHandler');
const config = require('config');

const apiVersion = config.get('app.apiVersion');
const API_PATH = `/api/${apiVersion}`;

const routes = [];

routes.push({
	path: `${API_PATH}/registration`,
	method: 'POST',
	handler: registrationHandler.register,
});

module.exports = routes;
