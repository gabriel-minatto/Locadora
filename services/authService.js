const md5 = require('md5');
const jwt = require('jwt-simple');
const auth = require("../middlewares/auth")();
const jwtConfig = require("./../config/jwt.js");

module.exports = function(app) {

    return {

        //testamos se o email/senha do usuario estao corretos
        //e se sim retornamos o token e o obj do usuario
        async authenticate(request) {

            if(!request.body.email || !request.body.password) {

                return false;
            }

            const email = request.body.email;
            const password = md5(request.body.password);

            const conn = app.connectionFactory();
            const Users = new app.models.Users(conn);

            let [user, ] = await Users.login(email, password);

            if(!user || !user.length || !user[0].id) return false;

            user = user[0];

            await Users.activateLogin(user.id);

            const payload = { id: user.id };
            const token = jwt.encode(payload, jwtConfig.secretOrKey);

            delete user.password;
            delete user.is_logged_in;

            return { token: token, user: user };
        },

        //desativamos o login no banco para evitar
        //que o usuario possa autenticar msm depois do logout
        async invalidateLogin(token) {

            const decoded = jwt.decode(
                this.formatBearerToken(token),
                process.env.JWTSECRET
            );

            if(!decoded || !decoded.id) return false;

            const conn = app.connectionFactory();
            const Users = new app.models.Users(conn);

            await Users.deactivateLogin(decoded.id);

            return true;
        },

        formatBearerToken: function(bearerToken) {

            if(!bearerToken) return false;

			const token = bearerToken.trim().replace('bearer ', '');

			return token || false;
		}
    }
}