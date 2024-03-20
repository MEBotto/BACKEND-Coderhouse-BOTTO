import GitHubStrategy from "../config/auth/github.config.js";
import JwtStrategy from "../config/auth/jwt.config.js";
//import GoogleStrategy from "#configs/auth/google.config.js";

import {
  githubCallbackController,
  googleCallbackController,
  registerController,
  loginController,
  getAccountByEmailController,
  updateAccountController,
  getAllUsersController,
} from "../controllers/auth.controller.js";

import { Router } from "express";
import passport from "passport";

import { checkUserRole } from "../middlewares/hasPermissionsMiddleware.js";

passport.use(GitHubStrategy);
passport.use(JwtStrategy);
//passport.use(GoogleStrategy);

const authRouter = new Router();

authRouter.use(passport.initialize());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

authRouter.get(
  "/github",
  passport.authenticate(GitHubStrategy, { scope: ["user:email"] })
);

authRouter.get(
  "/github/callback",
  passport.authenticate(GitHubStrategy, {
    session: false,
    failureRedirect: "http://localhost:5173/login",
    failureFlash: true,
  }),
  githubCallbackController
);

// authRouter.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile"] })
// );

// authRouter.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     session: false,
//     failureRedirect: "http://localhost:5173",
//     failureFlash: true,
//   }),
//   googleCallbackController
// );

authRouter.post("/register", registerController);

authRouter.post("/login", loginController);

authRouter.get("/user/:email", getAccountByEmailController);

authRouter.put("/user/:id", updateAccountController);

authRouter.get("/users", checkUserRole(["ADMIN"]), getAllUsersController);

export default authRouter;
