const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	sequelize.define('country', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		population: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		cca2: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		cca3: {
			type: DataTypes.STRING,
		},
	});
};
