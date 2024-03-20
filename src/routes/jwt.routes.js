import { Router } from "express";
import userModel from "../models/user.model.js";
import passport from 'passport';
import { isValidPassword, generateJWToken } from "../utils.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    console.log("User found.");
    console.log(user);

    if (!user) {
      console.warn("User doesn't exists with email: ", email);
      return res.status(204).send({ error: "Not found", message: "User not found with email: ", email });
    }

    if (!isValidPassword(user, password)) {
      console.warn("Invalid credentials!");
      return res.status(401).send({ status: "Error", message: "Invalid credentials!" });
    }

    const tokenUser = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      role: user.role
    };

    //JWT
    const access_token = generateJWToken(tokenUser);
    console.log(access_token);

    //With Cookies
    res.cookie("jwtCookieToken", access_token, { 
      maxAge: 60000,
      httpOnly: true
    }).send({ message: "Login success!!" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: "error", error: "Internal error." });
  }
});

router.post('/register', passport.authenticate('register', { session: false }), async (req, res) => {
  console.log("Registering user:");
  res.status(201).send({ status: "success", message: "User created" });
})

export default router;