import { Router } from "express";
import userModel from "../models/user.model.js";
import { createHash, generateJWToken, isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router()

router.get("/github", passport.authenticate("github", { scope: ['user:email'] }),
async (req, res) => {
  { }
})

router.get("/githubcallback", passport.authenticate('github', { failureRedirect: '/github/error' }), 
async (req, res) => {
  const user = req.user;
  req.session.user = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    age: user.age
  };
  req.session.admin = true;
  res.redirect("/users");
})
//Register
router.post('/register', passport.authenticate("register", {
    failureRedirect: "/api/session/fail-register",
    successRedirect: "/api/session/success-register"
  })
);

//Login
router.post('/login', passport.authenticate("login", {
  failureRedirect: "api/session/fail-login"
}), async (req,res) => {
  const user = req.user;
  console.log(user);

  if(!user) return res.status(401).send({status:"error", error: "user and password don't match"})
  const access_token = generateJWToken(user);
  console.log(access_token);

  res.send({ access_token: access_token });
})

router.get('/logout',  (req,res)=>{
  req.session.destroy(err =>{
      if(!err) return res.status(200).send("Logout successful")
      else res.send("Failure in logout")
  })
})

router.get("/fail-register", (req, res) => {
  res.status(401).send({error: "failed to process register"});
})

router.get("/success-register", (req, res) => {
  res.status(200).send({error: "success to process register"});
})

router.get("/fail-login", (req, res) => {
  res.status(401).send({error: "failed to process login"});
})

export default router