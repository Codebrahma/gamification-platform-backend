/* eslint-disable global-require */

// require new relic at the top only in production environment
if (process.env.NODE_ENV === 'production') require('newrelic');

const server = require('./server');
const plugins = require('./plugins');
const logger = require('./server/utils/logger');
const connectDatabase = require('./database');

const gracefulStopServer = () => {
	// Wait 10 secs for existing connection to close and then exit.
	server.stop({ timeout: 10 * 1000 }, () => {
		logger.info('Shutting down server');
		process.exit(0);
	});
};

process.on('uncaughtException', (err) => {
	logger.error(err, 'Uncaught exception');
	process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
	logger.error({
		promise,
		reason,
	}, 'unhandledRejection');
	process.exit(1);
});

process.on('SIGINT', gracefulStopServer);
process.on('SIGTERM', gracefulStopServer);

/**
 * Starts the server
 * Uses try / catch to start the server
 * This is a change fro V 16
 */
async function start() {
	try {
		await server.register(plugins);
		await server.start();
	} catch (err) {
		logger.error(err);
		process.exit(1);
	}
	logger.info('Server running at:', server.info.uri);
}

// This will try to establish a connection with database,
connectDatabase((error) => {
	// if connecting database failed with error
	if (error) {
		logger.error(`Connection with database failed. ${error}`);
		process.exit(1);
	}
	logger.info('Connection with database succeeded.');
	start();
});
