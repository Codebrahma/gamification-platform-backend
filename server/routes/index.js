const express = require('express');
const config = require('config');
const authRoutes = require('./authRoutes');

const apiVersion = config.get('app.apiVersion');
const API_PATH = `/api/${apiVersion}`;

module.exports = function (app) {
	const apiRoutes = express.Router();

	apiRoutes.use('/auth', authRoutes());
	app.use(API_PATH, apiRoutes);
};
