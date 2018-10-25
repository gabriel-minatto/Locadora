const router = require('express').Router();

module.exports = function(app){

    router.get('/', async function(req, res, next) {

        try {
            const movies = await app.services.moviesService.getAllJoinUsers();
            res.status(200);
            res.json(movies);

        } catch(err) {

            next(err);
        }
    });

    router.get('/available', async function(req, res, next) {

        try {
            const movies = await app.services.moviesService.getAllAvailable();
            res.status(200);
            res.json(movies);

        } catch(err) {

            next(err);
        }
    });

    router.get('/search/:title', async function(req, res, next) {

        try {
            const movies = await app.services.moviesService.getByTitle(req);
            res.status(200);
            res.json(movies);

        } catch(err) {

            next(err);
        }
    });

    router.post('/new', async function(req, res, next) {

        try {
            const result = await app.services.moviesService.new(req);
            res.status(201);
            res.json(result);

        } catch(err) {

            next(err);
        }
    });

    router.put('/rent', async function(req, res, next) {

        try {
            const result = await app.services.moviesService.rentMovie(req);
            res.status(200);
            res.json(result);

        } catch(err) {

            next(err);
        }
    });

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