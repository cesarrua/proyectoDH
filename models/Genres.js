const { DataTypes } = require("sequelize");
const db = require("../config/db"); 

const Genres = db.define("genres", {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	ranking: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	active: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = Genres;
