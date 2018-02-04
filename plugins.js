/**
 * Vendor modules
 */
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Good = require('good');
const config = require('config');
const appoloServer = require('apollo-server-hapi');

const graphQLSchema = require('./server/registration/graphQLSchema.js');
const graphQLResolvers = require('./server/registration/graphQLResolvers.js');
const User = require('./server/registration/registrationSchema.js');

const { makeExecutableSchema } = require('graphql-tools');

const executableSchema = makeExecutableSchema({
	typeDefs: [graphQLSchema],
	resolvers: graphQLResolvers({ User }),
});
/**
 * Internal modules
 */
const Package = require('./package.json');

const DEVELOPMENT = 'development';

/**
 * exports array of plugins with configuration.
 * @type {Array}
 */
let plugins = [];

if (config.util.getEnv('NODE_ENV') === DEVELOPMENT) {
	// add hapi swagger integration
	plugins = plugins.concat([
		Inert,
		Vision,
		{
			plugin: HapiSwagger,
			options: {
				info: {
					title: Package.description,
					version: Package.version,
				},
				pathPrefixSize: 4,
			},
		},
	]);

	// add good console for log reporting
	plugins.push({
		plugin: Good,
		options: {
			reporters: {
				console: [
					{
						module: 'good-console',
					},
					'stdout',
				],
			},
		},
	});

	// add Hapi
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
