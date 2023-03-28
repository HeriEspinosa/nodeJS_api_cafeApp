//REQUERIMOS EXPRESS QUE ES UNA LIBRERIA DE NODEJS.
const express = require('express');

//REQUERIMOS MORGAN QUE ES UNA LIBRERIA DE NODEJS.
const morgan = require('morgan');

//REQUERIMOS CORS QUE ES UNA LIBRERIA DE PROTECCION BASICA, COMO UN FIREWALL.
const cors = require('cors');

const productsRoutes = require('./routes/products.routes');

//INICIAMOS LA APLICACION DE EXPRESS EN LA VARIABLE APP
const app = express();

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log('Hello from the middleware! 🖐️');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date();
    next();
});

//2. ROUTES
app.use('/api/v1/products', productsRoutes);

// EXPORTS APP
module.exports = app;
