// config/passport.js
const { Strategy, ExtractJwt } = require("passport-jwt");
const { User } = require("../models");
const SECRET_KEY = "1234"; // Asegúrate de que esto coincide con tu clave secreta

module.exports = (passport) => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = SECRET_KEY;

  passport.use(
    new Strategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findByPk(jwt_payload.id);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
