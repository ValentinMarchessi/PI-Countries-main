const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('region', {
		name: {
			type: DataTypes.STRING,
		},
	});
};
