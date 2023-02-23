const { check, validationResult } = require('express-validator');
const usuario = require("../../models/User");
const { generarJWT, generarId } = require('../../helpers/token');

const formularioLogin = (req, res) => res.render('users/login', {errores: []})

const formularioRegistro = (req, res) => res.render('users/registro', {errores: []})

const autenticar = async (req, res) => {
    // Validacion
    await check('email').isEmail().withMessage('El email es obligatorio').run(req)
    await check('password').notEmpty().withMessage('La contraseña es obligatoria').run(req)

    let resultado = validationResult(req)

    
    if(!resultado.isEmpty()){
        return res.render('users/login', {
                errores: resultado.array(),
        })
    }

    
    const {email, password} = req.body;

    const Usuario = await usuario.findOne({where : {email}});
    if(!Usuario){
        return res.render('users/login', {
            errores: [{msg: 'El usuario no existe'}]
        })
    }

    // Revisar el password
    if(!Usuario.verificarPassword(password)){
        return res.render('users/login', {
            errores: [{msg: 'La contraseña es incorrecta'}]
        })
    }

    // Autenticar al usuario
    const token = generarJWT({id: Usuario.id, nombre: Usuario.nombre, admin: Usuario.admin});

    // Almacenar en un cookie
    return res.cookie('_token', token, {
        httpOnly: true
    }).redirect('/')
}

const cerrarSesion = (req, res) => {
    return res.clearCookie('_token').status(200).redirect('/')
}

// Logica para la creacion del usuario
const registrar = async (req, res) => {
    // Validacion
    await check('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req)
    await check('email').isEmail().withMessage('Eso no parece un email').run(req)
    await check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener por lo menos 6 caracteres').run(req)
    await check('repassword').equals(req.body.password).withMessage('Los Passwords no son iguales').run(req)

    //Mostrar errores y hacer la validacion
    let resultado = validationResult(req)

    //Verificar que el resultado este vacio
    if(!resultado.isEmpty()){
        return res.render('users/registro', {
                errores: resultado.array(),
        })
    }

    // Extraer los datos
    const { nombre, email, password } = req.body
    // Verificar que el usuario no este duplicado
    const existeUsuario = await usuario.findOne( { where : { email } })
    if(existeUsuario) {
        return res.render('users/registro', {
            errores: [{msg: 'El Usuario ya esta Registrado'}]
        })
    }

    // Almacenar un usuario
    const usuarioC = await usuario.create({
        nombre, 
        email,
        password,
        token: generarId()
    })

    return res.redirect('/')
} 

module.exports = {
    formularioLogin,
    autenticar,
    cerrarSesion,
    formularioRegistro,
    registrar,
};