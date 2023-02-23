const express = require("express");
const router = express.Router();
const { formularioLogin,
    autenticar,
    cerrarSesion,
    formularioRegistro,
    registrar
} = require('../contollers/userController');

router.get('/login', formularioLogin);
router.post('/login', autenticar); 

router.post('/cerrar-sesion', cerrarSesion)

router.get('/registro', formularioRegistro);
router.post('/registro', registrar);


module.exports = router;