// Imports the schema, resolvers and the model
const graphQLSchema = require('./graphQLSchema.js');
const graphQLResolvers = require('./graphQLResolvers.js');

const User = require('../../db/schema/userSchema.js');

const { makeExecutableSchema } = require('graphql-tools');

const model = {
	User,
};

// Uses graphQL tools to make create a proper schema
const executableSchema = makeExecutableSchema({
	typeDefs: [graphQLSchema],
	resolvers: graphQLResolvers(model),
});

module.exports = executableSchema;
