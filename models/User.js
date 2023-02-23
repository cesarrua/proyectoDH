const { DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');
const db = require('../config/db.js');

// Aquí estamos creando un modelo de usuarios y cada atributo sera una columna
const usuario = db.define('usuarios', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    admin: DataTypes.BOOLEAN
}, {
    hooks: {
        beforeCreate: async function(Usuario) {
            const salt = await bcrypt.genSalt(10);
            Usuario.password = await bcrypt.hash( Usuario.password, salt);
        }
    },
    scopes: {
        eliminarPassword:{
            attributes: {
                exclude: ['password', 'token', 'confirmado', 'createdAt', 'updatedAt']
            }
        }
    }
});

// Metodos personalizados

usuario.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

module.exports = usuario;