const router = require('express').Router();

module.exports = function(app){

    /**
     * @api {get} movies Listagem de filmes com usuário que alugou (se estiver alugado)
     * @apiGroup Movies
     * @apiHeader {String} Authorization Token fornecido pelo /login.
     * @apiHeader {String} Content-Type application/x-www-form-urlencoded.
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 200 OK
     *    {
     *           "movies": [
     *               {
     *                   "id": 1,
     *                   "title": "Teste",
     *                   "director": "Testador",
     *                   "hash_code": "23d06daa07544c8f1890b2925cc193fb",
     *                   "user": null,
     *                   "name": null,
     *                   "email": null
     *               }
     *           ]
     *     }
     */
    router.get('/', async function(req, res, next) {

        try {
            const movies = await app.services.moviesService.getAllJoinUsers();
            res.status(200);
            res.json(movies);

        } catch(err) {

            next(err);
        }
    });

    /**
     * @api {get} movies/available Listagem de filmes disponíveis para aluguel
     * @apiGroup Movies
     * @apiHeader {String} Authorization Token fornecido pelo /login.
     * @apiHeader {String} Content-Type application/x-www-form-urlencoded.
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 200 OK
     *  {
     *      "movies": [
     *          {
     *              "id": 1,
     *              "title": "Teste",
     *              "director": "Testador",
     *              "hash_code": "23d06daa07544c8f1890b2925cc193fb",
     *              "user": null
     *          }
     *      ]
     *  }
     */
    router.get('/available', async function(req, res, next) {

        try {
            const movies = await app.services.moviesService.getAllAvailable();
            res.status(200);
            res.json(movies);

        } catch(err) {

            next(err);
        }
    });

    /**
     * @api {get} movies/search/:title Busca de filmes pelo título
     * @apiGroup Movies
     * @apiHeader {String} Authorization Token fornecido pelo /login.
     * @apiHeader {String} Content-Type application/x-www-form-urlencoded.
     * @apiParam {String} title  Título para busca.
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 200 OK
     *  {
     *      "movies": [
     *          {
     *              "id": 1,
     *              "title": "Teste",
     *              "director": "Testador",
     *              "hash_code": "23d06daa07544c8f1890b2925cc193fb",
     *              "user": 1
     *          }
     *      ]
     *  }
     */
    router.get('/search/:title', async function(req, res, next) {

        try {
            const movies = await app.services.moviesService.getByTitle(req);
            res.status(200);
            res.json(movies);

        } catch(err) {

            next(err);
        }
    });

    /**
     * @api {post} movies/new Cadastro de filmes
     * @apiGroup Movies
     * @apiHeader {String} Content-Type application/x-www-form-urlencoded.
     * @apiHeader {String} Authorization Token fornecido pelo /login.
     * @apiParam {String} title  Título do filme.
     * @apiParam {String} director  Diretor do filme.
     * @apiParamExample {json} Request-Sample:
     *     {
     *       "title" : "Teste",
     *       "director" : "Testador"
     *     }
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 201 Created
     * {
     *      "msg": "Filme inserido com sucesso!",
     *      "movie": {
     *          "id": 1
     *      }
     *  }
     */
    router.post('/new', async function(req, res, next) {

        try {
            const result = await app.services.moviesService.new(req);
            res.status(201);
            res.json(result);

        } catch(err) {

            next(err);
        }
    });

    /**
     * @api {put} movies/rent Aluguel de filmes
     * @apiGroup Movies
     * @apiHeader {String} Content-Type application/x-www-form-urlencoded.
     * @apiHeader {String} Authorization Token fornecido pelo /login.
     * @apiParam {String} movie  Id do filme a ser alugado.
     * @apiParam {String} user  Id do usuário que alugará o filme.
     * @apiParamExample {json} Request-Sample:
     *     {
     *       "movie" : "1",
     *       "user" : "1"
     *     }
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 200 OK
     *   {
     *       "msg": "Filme alugado com sucesso!"
     *   }
     */
    router.put('/rent', async function(req, res, next) {

        try {
            const result = await app.services.moviesService.rentMovie(req);
            res.status(200);
            res.json(result);

        } catch(err) {

            next(err);
        }
    });

    /**
     * @api {put} movies/free Devolução de filmes
     * @apiGroup Movies
     * @apiHeader {String} Content-Type application/x-www-form-urlencoded.
     * @apiHeader {String} Authorization Token fornecido pelo /login.
     * @apiParam {String} movie  Id do filme a ser devolvido.
     * @apiParamExample {json} Request-Sample:
     *     {
     *       "movie" : "1"
     *     }
     * @apiSuccessExample {json} Sucesso
     *    HTTP/1.1 200 OK
     *   {
     *       "msg": "Filme liberado com sucesso!"
     *   }
     */
    router.put('/free', async function(req, res, next) {

        try {
            const result = await app.services.moviesService.freeMovie(req);
            res.status(200);
            res.json(result);

        } catch(err) {

            next(err);
        }
    });

    app.use('/movies', router);

};