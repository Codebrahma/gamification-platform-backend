const express = require('express');
const config = require('config');
const passport = require('passport');
const authRoutes = require('./authRoutes');

const apiVersion = config.get('app.apiVersion');
const API_PATH = `/api/${apiVersion}`;

require('./passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app) {
	const apiRoutes = express.Router();

	apiRoutes.use('/auth', authRoutes(requireAuth, requireLogin));
	app.use(API_PATH, apiRoutes);
};
