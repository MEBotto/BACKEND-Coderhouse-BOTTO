import { config } from "../env.config.js";
import { Strategy, ExtractJwt } from "passport-jwt";

const JwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
  },
  async (payload, done) => {
    try {
      return done(null, payload.user);
    } catch (error) {
      return done(error);
    }
  }
);

export default JwtStrategy;