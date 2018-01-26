const weatherService = require('./weatherService');

const getWeatherByCityName = async cityName => weatherService.getWeatherByCityName(cityName);

module.exports = {
	getWeatherByCityName,
};
