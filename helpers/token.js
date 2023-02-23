const Jwt = require("jsonwebtoken");

const generarJWT = datos => Jwt.sign({ id: datos.id, nombre: datos.nombre, admin: datos.admin }, process.env.JWT_SECRET, {expiresIn: '1d'})


const generarId = () => Math.random().toString(32).substring(2) + Date.now().toString(32);

module.exports  = {
    generarId,
    generarJWT
}