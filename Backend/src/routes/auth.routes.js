import GitHubStrategy from "../config/auth/github.config.js";
import JwtStrategy from "../config/auth/jwt.config.js";
//import GoogleStrategy from "#configs/auth/google.config.js";

import {
  githubCallbackController,
  googleCallbackController,
  registerController,
  loginController,
  recoverPasswordController,
  newPasswordController,
  logoutController,
  userPremiumController,
  documentsController,
} from "../controllers/auth.controller.js";

import { Router } from "express";
import passport from "passport";

import { checkUserRole } from "../middlewares/hasPermissionsMiddleware.js";
import { uploadToCloudinary } from "../middlewares/multerMiddleware.js";

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

authRouter.get("/logout", logoutController);

authRouter.post("/recover-password", recoverPasswordController);

authRouter.post("/new-password/:token", newPasswordController);

authRouter.put("/user/premium/:uid", userPremiumController);

authRouter.post(
  "/users/:uid/documents",
  uploadToCloudinary(
    [
      { name: "id", maxCount: 1 },
      { name: "residenceProof", maxCount: 1 },
      { name: "bankStatementProof", maxCount: 1 },
    ],
    "fields"
  ),
  documentsController
);

export default authRouter;
