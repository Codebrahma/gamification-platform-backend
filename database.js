// Load app configuration
const config = require('config');
// Load mongoose
const Mongoose = require('mongoose');

const connectDatabase = (callback) => {
	// Calling Mongoose connect method with database URI will create a connection.
	Mongoose.connect(config.get('app.dbConfig.url'));

	const database = Mongoose.connection;
	// If connection successfully established
	database.once('connected', () => {
		console.log('Connection with database succeeded.');
		// returning status as true on success
		callback(true);
	});

	// If connection throws an error
	database.on('error', (error) => {
		console.log('Connection with database failed.');
		console.log(error);
		// returning status as false on failure
		callback(false);
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
