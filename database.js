// Load app configuration
const config = require('config');
// Load mongoose
const Mongoose = require('mongoose');

const connectDatabase = (callback) => {
	// Calling Mongoose connect method with database URI will create a connection.
	Mongoose.connect(config.get('app.dbConfig.url'));

	// If connection successfully established
	Mongoose.connection
		.once('connected', callback)
		.on('error', callback)
		.on('disconnected', () => {
			connectDatabase(callback);
		});

	// If the Node process ends, close the Mongoose connection
	process.on('SIGINT', () => {
		Mongoose.connection.close(() => {
			process.exit(0);
		});
	});
};

module.exports = connectDatabase;
