const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Movies = db.define("movies", {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	rating: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	awards: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	release_date: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	length: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = Movies;
