// Resolver functions for my schema
const resolvers = models => ({
	Query: {
		// Gets User by email
		getUserByEmail(root, { email }) {
			return models.User.findOne({ email }).then(response => response);
		},
		// Gets User by userName
		getUserByUserName(root, { userName }) {
			return models.User.findOne({ userName }).then(response => response);
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
