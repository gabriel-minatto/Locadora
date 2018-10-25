// auth.js
const jwt = require('jwt-simple');
const passport = require("passport");
const jwtConfig = require("./../config/jwt.js");
const Strategy = require("passport-jwt").Strategy;

module.exports = function (app) {

	const strategy = new Strategy(jwtConfig, async function (payload, done) {

		const userId = payload.id || null;

		if (!userId) {

			return done(new Error("Token inválido"), null);
		}

		const conn = app.connectionFactory();
		const Users = new app.models.Users(conn);

		const user = await Users.findById(userId);

		if (!user) {

			return done(new Error("Usuário não encontrado"), null);
		}

		return done(null, { id: user.id });

	});

	passport.use(strategy);

	return {

		initialize: function () {
			return passport.initialize();
		},

		//garante que usuario nao acessem rotas privadas
		//apos efetuar logoff
		//mesmo que o token ainda esteja valido
		userIsLoggedIn: function(app) {

			return async (req ,res, next) => {

				//executa verificacao apenas se o usuario esta tentando
				//acessar rotas privadas
				if(!req.headers || !req.headers['authorization']) {

					next();
					return;
				}

				const bearerToken = req.headers['authorization'];

				const token = app.services.authService.formatBearerToken(bearerToken);

				const decoded = jwt.decode(token, process.env.JWTSECRET);

				const conn = app.connectionFactory();
				const Users = new app.models.Users(conn);

				const [active, ] = await Users.checkLoginActive(decoded.id);

				if(!active || !active.length) {
					res.sendStatus(401);
					return;
				}

				next();
			};

		},

		authenticate: function () {

			return passport.authenticate("jwt", jwtConfig.jwtSession);
		}

	};
};