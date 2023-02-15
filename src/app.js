const express = require('express');
const app = express();
const path = require('path');
const db = require('../config/db');
const router = require('../src/routes/router')

app.listen(3000, () => console.log("servidor corriendo"));

//configurando ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//conexion a la base de datos
try {
    db.authenticate();
    db.sync();
    console.log('Conexion correcta a la base datos');
} catch (error) {
    console.log(error);
};

app.use('/', router );