const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('subregion', {
		name: {
			type: DataTypes.STRING,
		},
	});
};
