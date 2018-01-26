const Hapi = require('hapi');
const config = require('config');

const routes = require('./routes');

const server = Hapi.Server({
	port: config.get('app.port'),
});

// attach routes here
server.route(routes);

// export modules
module.exports = server;
