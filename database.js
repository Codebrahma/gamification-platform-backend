// Load app configuration
const config = require('config');
// Load mongoose
const Mongoose = require('mongoose');

const connectDatabase = (callback) => {
	// Calling Mongoose connect method with database URI will create a connection.
	Mongoose.connect(config.get('app.dbConfig.url'), (error) => {
		// If connection failed with error
		if (error) {
			// run callback with error
			callback(error);
		}
	});

	const database = Mongoose.connection;
	// If connection successfully established
	database.once('connected', () => {
		console.log('Connection with database succeeded.');
	});

	// If connection disconnected
	database.on('disconnected', () => {
		console.log('Database connection disconnected');
	});

	// If the Node process ends, close the Mongoose connection
	process.on('SIGINT', () => {
		database.close(() => {
			process.exit(0);
		});
	});
};

module.exports = connectDatabase;
