const router = require('express').Router();

module.exports = function(app){

    const auth = require("../../middlewares/auth")(app);

    router.post('/login', async function(req, res) {

        const result = await app.services.authService.authenticate(req, res);

        if (!result) {

            res.sendStatus(401);
            return;
        }

        res.json(result);
    });

    //rota explicitamente declarada como privada atraves do middleware
    //auth.authenticate()
    router.get('/logout', auth.authenticate(), function(req, res) {

        const token = req.headers['authorization'];
        const invalidate = app.services.authService.invalidateLogin(token);

        if(!invalidate) {
            res.sendStatus(500);
            return;
        }

        res.json(['Deslogado']);
    });

    app.use('/', router);

};