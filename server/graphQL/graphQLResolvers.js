const getUserByEmail = require('../common/getUserByEmail');
const getUserByUserName = require('../common/getUserByUserName');

// Resolver functions for my schema
const resolvers = models => ({
	Query: {
		// Gets User by email
		getUserByEmail(root, { email }) {
			return getUserByEmail(models.User, { email });
		},
		// Gets User by userName
		getUserByUserName(root, { userName }) {
			return getUserByUserName(models.User, { userName });
		},
	},
	Mutation: {
		// Creates a new user
		createUser(root, args) {
			const user = new models.User(args);
			return user.save().then(response => response);
		},
	},
});

module.exports = resolvers;
