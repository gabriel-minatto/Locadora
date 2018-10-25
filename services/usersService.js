const md5 = require('md5');

module.exports = function(app) {

    return {

        async new(req) {

            req.assert("email", "Endereço de email é obrigatório!").notEmpty()
                .isEmail().withMessage('Você deve informar um endereço de email válido!');
            req.assert("name", "O nome é obrigatório!").notEmpty();
            req.assert("password", "A senha é obrigatória!").notEmpty();

            var erros = req.validationErrors();

            if (erros) {
                throw app.customError(erros, 400);
            }

            const email = req.body.email;
            const name = req.body.name;
            const password = md5(req.body.password);

            const conn = app.connectionFactory();
            const Users = new app.models.Users(conn);

            const [user, ] = await Users.insert({ email, name, password });

            return { msg: "Usuário inserido com sucesso!", user: { id: user.insertId } };
        }
    }
}