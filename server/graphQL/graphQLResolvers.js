const userDataAccess = require('../../db/dataaccess/user');

// Resolver functions for my schema
const resolvers = () => ({
	Query: {
		// Gets User by email
		getUserByEmail(root, { email }) {
			return userDataAccess.getUserByEmail({ email });
		},
		// Gets User by userName
		getUserByUserName(root, { userName }) {
			return userDataAccess.getUserByUserName({ userName });
		},
	},
	Mutation: {
		// Creates a new user
		createUser(root, args) {
			return userDataAccess.createUser(args);
		},
	},
});

module.exports = resolvers;
