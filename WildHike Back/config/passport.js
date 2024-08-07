const { Strategy, ExtractJwt } = require("passport-jwt");
const { User } = require("../models"); // Usa el nombre correcto del modelo
const { SECRET_KEY } = require("./auth"); // Asegúrate de que SECRET_KEY esté correctamente importado

module.exports = (passport) => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = SECRET_KEY;

  passport.use(
    new Strategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findByPk(jwt_payload.id); // Usa el nombre correcto del modelo
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
