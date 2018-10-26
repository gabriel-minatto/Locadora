const router = require('express').Router();

module.exports = function(app){

    /**
     * @api {post} users Criação de usuários
     * @apiGroup Users
     * @apiHeader {String} Content-Type application/x-www-form-urlencoded.
     * @apiParam {String} email  E-mail do usuário. (único)
     * @apiParam {String} name  Nome do usuário.
     * @apiParam {String} password  Senha do usuário.
     * @apiParamExample {json} Request-Sample:
     *     {
     *       "email" : "teste@teste.com",
     *       "name" : "Teste",
     *       "password" : "123456"
     *     }
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 201 Created
     * {
     *      "msg": "Usuário inserido com sucesso!",
     *      "user": {
     *          "id": 1
     *      }
     *  }
     */
    router.post('/', async function(req, res, next) {

        try {
            const result = await app.services.usersService.new(req);
            res.status(201);
            res.json(result);

        } catch(err) {

            next(err);
        }
    });

    app.use('/users', router);

};