/**
 * Vendor modules
 */
const config = require('config');
const appoloServer = require('apollo-server-hapi');

const executableSchema = require('./server/graphQL/executableSchema');

const DEVELOPMENT = 'development';

/**
 * exports array of plugins with configuration.
 * @type {Array}
 */
const plugins = [];

if (config.util.getEnv('NODE_ENV') === DEVELOPMENT) {
	// HAPI Graphql for HTTP endpoints
	plugins.push({
		plugin: appoloServer.graphqlHapi,
		options: {
			path: '/graphql',
			graphqlOptions: {
				schema: executableSchema,
			},
			route: {
				cors: true,
			},
		},
	});

	// graphiql interface
	plugins.push({
		plugin: appoloServer.graphiqlHapi,
		options: {
			path: '/graphiql',
			graphiqlOptions: {
				schema: executableSchema,
				endpointURL: '/graphql',
			},
		},
	});
}

module.exports = plugins;
