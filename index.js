require('dotenv').config();
const app = require('./config/express')();

//console.log(app.controllers.pagamentos.module(app));

app.listen(process.env.PORT || 3000, function(){
        console.log("Servidor rodando na porta "+process.env.PORT) 
});

