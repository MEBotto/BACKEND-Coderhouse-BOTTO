import passport from "passport";
import passportLocal from "passport-local";
import GitHubStrategy from "passport-github2";
import jwtStrategy from "passport-jwt";
import userModel from "../services/db/models/user.model.js";
import { createHash, isValidPassword, PRIVATE_KEY } from "../utils.js";

const localStrategy = passportLocal.Strategy;
const JWTStrategy = jwtStrategy.Strategy;
const extractJWT = jwtStrategy.ExtractJwt;

const initializePassport = () => {
  passport.use('github', new GitHubStrategy(
    { 
      clientID: "Iv1.6d27ceb2b8699224",
      clientSecret: "a4e131896fd05232e058cf7070ea1de7b7d90b56",
      callbackUrl: "http://localhost:8080/api/extend/users/githubcallback"
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Profile obtenido del usuario de GitHub: ");
      console.log(profile);
      try {
        const user = await userModel.findOne({ email: profile._json.email });
        if (!user) {
          console.warn("User doesn't exists with username: " + profile._json.email);
          let newUser = {
            first_name: profile._json.name,
            last_name: '',
            age: 20,
            email: profile._json.email,
            password: '',
            loggedBy: "GitHub"
          }
          const result = await userModel.create(newUser);
          return done(null, result)
        } else {
          return done(null, user)
        }
      } catch (error) {
        return done(error)
      }
    })
  );

  passport.use('register', new localStrategy(
    { passReqToCallback: true, usernameField: 'email' },
    async (req, username, password, done) => {
      const {first_name, last_name, email, age, role} = req.body 
      try {
        const exist = await userModel.findOne({ email });
        if (exist) {
          done(null, false)
        }

        const hashedPassword = createHash(password)

        const user = {
          first_name,
          last_name,
          email,
          age,
          password: hashedPassword,
          cart: [],
          loggedBy: 'form',
          role
        }

        const result = await userModel.create(user);
        return done(null, result)
      } catch (error) {
        return done("Error registering the user " + error);
      }
    }
  ));

  passport.use('jwt', new JWTStrategy(
    {
      jwtFromRequest: extractJWT.fromExtractors([cookieExtractor]),
      secretOrKey: PRIVATE_KEY
    }, async (jwt_payload, done) => {
      try {
        return done(null, jwt_payload.user);
      } catch (error) {
        return done(error);
      }
    }
  ));

  // Middleware de serialización y deserialización
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      console.error("Error deserializing the user: " + error);
    }
  });
};

//CookieExtractor
export const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwtCookieToken'];
  }
  return token;
}

export default initializePassport;