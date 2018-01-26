/* eslint-disable global-require */

// require new relic at the top only in production environment
if (process.env.NODE_ENV === 'production') require('newrelic');

const server = require('./server');
const logger = require('./server/utils/logger');

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
		await server.start();
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
	console.log('Server running at:', server.info.uri);
}

start();
