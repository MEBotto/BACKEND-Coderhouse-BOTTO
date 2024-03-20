import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const PRIVATE_KEY = "Rf2FJoVLp6H6BIJQVLyl2KueI28Cj5hW";

//Generate Hash
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//Validate Hashed Password
export const isValidPassword = (user, password) => {
  console.log(`User-Password: ${user.password}, Password: ${password}`);
  return bcrypt.compareSync(password, user.password)
}

//JWT
//Generate Token
export const generateJWToken = (user) => {
  return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '60s' })
}

//Authenticate Token
export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Token present in header auth: ");
  console.log(authHeader);

  if(!authHeader){
    return res.status(401).send({ error: "User not authenticated or missing token." });
  }

  const token = authHeader.split(' ')[1];//Split to remove the word Bearer.
  //Validate Token
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error) return res.status(403).send({ error: "Token invalid, unauthorized!" });
    //Token OK
    req.user = credentials.user;
    console.log(req.user);
    next();
  })
}

export const passportCall = (strategy) => {
  return async (req, res, next) => {
      console.log(strategy);
      passport.authenticate(strategy, function (err, user, info) {
          if (err) return next(err);
          if (!user) {
              return res.status(401).send({ error: info.messages ? info.messages : info.toString() });
          }
          console.log("Usuario obtained from strategy: ");
          console.log(user);
          req.user = user;
          next();
      })(req, res, next);
  }
};

export const authorization = (role) => {
  return async (req, res, next) => {
      if (!req.user) return res.status(401).send("Unauthorized: User not found in JWT")

      if (req.user.role !== role) {
          return res.status(403).send("Forbidden: user doesn't have permission with this role.");
      }
      next()
  }
};

export default __dirname;