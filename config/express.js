const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const auth = require("./../middlewares/auth")();
const errorHandler = require("./../middlewares/error");


module.exports = function(){

    const app = express();

    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());

    app.use(auth.initialize());

    app.use(expressValidator());

    //carregamos dependencias e endpoints publicos
    consign({cwd: '/app/config'})
        .include('./connectionFactory.js')
        .then('./customError.js')
        .into(app);

    consign()
        .include('models')
        .then('services')
        .into(app);

    //verificamos se o usuario n efetuou logout
    app.use(auth.userIsLoggedIn(app));

    //carregamos controllers publicas
    consign()
        .then('controllers/public')
        .into(app);

    //adicionamos o middleware de autenticacao
    app.use(auth.authenticate());

    //carregamos controllers privadas
    consign()
        .include('controllers/private')
        .into(app);

    //modulo para tratamento customizado de erros
    app.use(errorHandler);

    app.use(function(req,res,next) {
        res.status(404).json({ "error": "Rota não encontrada"});
        next();
    });

    return app;
};