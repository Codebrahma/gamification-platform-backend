const Hapi = require('hapi');
const config = require('config');
const routes = require('./routes');
// This will start creating a connection to database.
const database = require('./database'); // eslint-disable-line no-unused-vars

const server = Hapi.Server({
	port: config.get('app.port'),
});

// attach routes here
server.route(routes);

// export modules
module.exports = server;
