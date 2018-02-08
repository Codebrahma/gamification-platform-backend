const logger = require('./server/utils/logger');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');
const mongoose = require('mongoose');
const config = require('config');

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('method-override')());

if (!isProduction) {
	app.use(errorhandler());
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
	app.use((err, req, res) => {
		logger.error(err.stack);

		res.status(err.status || 500);

		res.json({
			errors: {
				message: err.message,
				error: err,
			},
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
	res.status(err.status || 500);
	res.json({
		errors: {
			message: err.message,
			error: {},
		},
	});
});

function listen() {
	if (app.get('env') === 'test') return;
	app.listen(port);
	logger.info(`Express app started on port ${port}`);
}

function connect() {
	const options = { keepAlive: 1 };
	mongoose.connect(config.get('app.dbConfig.url'), options);
	return mongoose.connection;
}

connect()
	.on('error', logger.error)
	.on('disconnected', connect)
	.once('open', listen);
