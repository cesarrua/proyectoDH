const express = require('express');
const app = express();
const path = require('path');
const db = require('../config/db');
const router = require('./routes/router');
const userRoutes = require('./routes/userRoutes')
const cookieParser = require('cookie-parser')

app.listen(3000, () => console.log("servidor corriendo"));

//configurando ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser());

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//conexion a la base de datos
try {
    db.authenticate();
    db.sync();
    console.log('Conexion correcta a la base datos');
} catch (error) {
    console.log(error);
};

app.use('/', router );
app.use('/users', userRoutes);