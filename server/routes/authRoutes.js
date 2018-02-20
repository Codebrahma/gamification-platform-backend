const express = require('express');
const authControllers = require('../controllers/authControllers');

module.exports = function (requireAuth, requireLogin) {
	const authRoutes = express.Router();

	authRoutes.post('/registration', authControllers.registration);
	authRoutes.post('/login', requireLogin, authControllers.login);
	return authRoutes;
};
