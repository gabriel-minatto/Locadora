const router = require('express').Router();

module.exports = function(app){

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