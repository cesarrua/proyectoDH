const jwt = require("jsonwebtoken");
const { usuario } = require("../models/index.js");

const protegerRuta = async (req, res, next) => {
    
    // Verificar si hay un token
    const { _token } = req.cookies

    if(!_token) {
        return res.render('users/login', {errores: []})
    }
    // Comprobar el token
    try {
        const decoded = jwt.verify(_token, process.env.JWT_SECRET)

        // Almacenar el usuario al req
        if(!decoded.admin === true) {
            return res.render('users/login', {errores: []})
        }
        
        return next();
    } catch (error) {
        return res.clearCookie('_token').render('users/login', {errores: []})
    }
}

module.exports = protegerRuta;