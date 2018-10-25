const md5 = require('md5');

module.exports = function(app) {

    return {

        async new(req) {

            req.assert("title", "O parâmetro 'title' é obrigatório!").notEmpty();
            req.assert("director", "O parâmetro 'director' é obrigatório!").notEmpty();

            var erros = req.validationErrors();

            if (erros) {
                throw app.customError(erros, 400);
            }

            const title = req.body.title;
            const director = req.body.director;
            const hash_code = md5(title+director);

            const conn = app.connectionFactory();
            const Movies = new app.models.Movies(conn);

            const [movie, ] = await Movies.insert({ title, director, hash_code });

            return { msg: "Filme inserido com sucesso!", movie: { id: movie.insertId } };
        },

        async getAllJoinUsers() {

            const conn = app.connectionFactory();
            const Movies = new app.models.Movies(conn);

            const [movies, ] = await Movies.findAllJoinUsers();

            return { movies };
        },

        async getAllAvailable() {

            const conn = app.connectionFactory();
            const Movies = new app.models.Movies(conn);

            const [movies, ] = await Movies.findAllAvailable();

            return { movies };
        },

        async getByTitle(req) {

            const title = req.params.title;

            const conn = app.connectionFactory();
            const Movies = new app.models.Movies(conn);

            const [movies, ] = await Movies.findByTitle(title);

            return { movies };
        },

        async rentMovie(req) {

            req.assert("movie", "O parâmetro 'movie' é obrigatório!").notEmpty();
            req.assert("user", "O parâmetro 'user' é obrigatório!").notEmpty();

            var erros = req.validationErrors();

            if (erros) {

                throw app.customError(erros, 400);
            }

            const movie = req.body.movie;
            const user = req.body.user;

            const conn = app.connectionFactory();
            const Movies = new app.models.Movies(conn);

            await Movies.rentMovie(movie, user);

            return { msg: 'Filme alugado com sucesso!' };
        },

        async freeMovie(req) {

            req.assert("movie", "O parâmetro 'movie' é obrigatório!").notEmpty();

            var erros = req.validationErrors();

            if (erros) {

                throw app.customError(erros, 400);
            }

            const movie = req.body.movie;

            const conn = app.connectionFactory();
            const Movies = new app.models.Movies(conn);

            await Movies.freeMovie(movie);

            return { msg: 'Filme liberado com sucesso!' };
        }
    }
}