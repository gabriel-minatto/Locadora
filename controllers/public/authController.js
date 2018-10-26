const router = require('express').Router();

module.exports = function(app){

    const auth = require("../../middlewares/auth")(app);

    /**
     * @api {post} login Login da aplicação
     * @apiGroup Auth
     * @apiHeader {String} Content-Type application/x-www-form-urlencoded.
     * @apiHeaderExample {json} Header-Sample:
     *     {
     *       "Content-Type": "application/x-www-form-urlencoded"
     *     }
     * @apiParam {String} email  E-mail.
     * @apiParam {String} password  Senha.
     * @apiParamExample {json} Request-Sample:
     *     {
     *       "email" : "teste@teste.com",
     *       "password" : "123456"
     *     }
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *  {
     *      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.eX243jqXLsyWA7gZRn4DlnzVqbRiDTmpP-i3Zxz_EUc",
     *      "user": {
     *          "id": 1,
     *          "name": "Teste",
     *          "email": "teste@teste.com"
     *      }
     *  }
     */
    router.post('/login', async function(req, res) {

        const result = await app.services.authService.authenticate(req, res);

        if (!result) {

            res.sendStatus(401);
            return;
        }

        res.json(result);
    });

    /**
     * @api {get} logout Logout da aplicação
     * @apiGroup Auth
     * @apiHeader {String} Authorization Token fornecido pelo /login.
     * @apiHeaderExample {json} Header-Sample:
     *     {
     *       "Authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.eX243jqXLsyWA7gZRn4DlnzVqbRiDTmpP-i3Zxz_EUc"
     *     }
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 200 OK
     * [
     *     "Deslogado"
     * ]
     */
    router.get('/logout', auth.authenticate(), function(req, res) {
    //rota explicitamente declarada como privada atraves do middleware
    //auth.authenticate()

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