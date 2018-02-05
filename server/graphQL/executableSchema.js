// Imports the schema, resolvers and the model
const graphQLSchema = require('./graphQLSchema.js');
const graphQLResolvers = require('./graphQLResolvers.js');
const { makeExecutableSchema } = require('graphql-tools');

// Uses graphQL tools to make create a proper schema
const executableSchema = makeExecutableSchema({
	typeDefs: [graphQLSchema],
	resolvers: graphQLResolvers(),
});

module.exports = executableSchema;
