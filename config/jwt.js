const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;

module.exports = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWTSECRET,
    jwtSession: {session: false}
};