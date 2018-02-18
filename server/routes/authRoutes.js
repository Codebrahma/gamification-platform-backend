const express = require('express');
const authControllers = require('../controllers/authControllers');

module.exports = function () {
	const authRoutes = express.Router();

	authRoutes.post('/registration', authControllers.registration);

	return authRoutes;
};
