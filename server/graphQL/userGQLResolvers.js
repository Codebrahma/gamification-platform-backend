const User = require('../../db/schema/userSchema');

// Resolver functions for my schema
const resolvers = {
	Query: {
		// Gets User by email
		getUserByEmail: (root, { email }) => User.findOne({ email }),
		// Gets User by userName
		getUserByUserName: (root, { userName }) => User.findOne({ userName }),
	},
	Mutation: {
		// Creates a new user
		createUser: (root, args) => new User(args).save(),
	},
};

module.exports = resolvers;
