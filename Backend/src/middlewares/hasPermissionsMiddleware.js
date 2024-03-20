import jwt from "jsonwebtoken";
import { config } from "../config/env.config.js"

export function checkUserRole(roles) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({ message: 'User not authenticated or missing token.' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, config.jwtSecret, (error, decodedToken) => {
      if (error) {
        return res.status(401).send({ message: 'Invalid Token, unauthorized!', error: error });
      }

      const userRole = decodedToken.role;

      if (!roles.includes(userRole.toUpperCase())) {
        return res.status(403).send({ error: 'User does not have the required privileges.' });
      }

      next();
    });
  };
}
