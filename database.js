// Load app configuration
const config = require('config');
// Load mongoose
const Mongoose = require('mongoose');
// Calling Mongoose connect method with database URI will create a connection.
Mongoose.connect(config.get('app.dbConfig.url'));

const database = Mongoose.connection;
// If connection successfully established
database.once('connected', () => {
	console.log('Connection with database succeeded.');
});
// If connection throws an error
database.on('error', console.error.bind(console, 'connection error'));

// If connection disconnected
database.on('disconnected', () => {
	console.log('connection disconnected');
});

exports.database = database;
