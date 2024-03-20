import { config } from "../config/env.config.js";
import jwt from "jsonwebtoken";

export const generateJWToken = (user) => {
  const token = jwt.sign({ user }, config.jwtSecret, {
    expiresIn: "8h",
  });

  return token;
};
