import CustomRouter from "./custom.routes.js";
import UserService from "../../services/db/users.service.js";
import { createHash, isValidPassword, generateJWToken, passportCall } from "../../utils.js";
import passport from "passport";

export default class UserExtendRouter extends CustomRouter {
  init(){
    const userService = new UserService();

    this.get('/profile', ["USER", "USER_PREMIUN", "ADMIN"], (req, res) => {
      res.sendSuccess(req.user) 
    });

    this.get('/currentUser', ["USER", "USER_PREMIUN"], (req, res) => { 
      res.sendSuccess(req.user) 
    });

    this.get('/premiun', ["USER_PREMIUN"], (req, res) => {
      res.sendSuccess(req.user);
    });

    this.get('/admin', ["ADMIN"], (req, res) => {
      res.sendSuccess(req.user);
    });

    this.get('/admin/getUsers', ['ADMIN'], async (req, res) => {
      try {
        const userService = new UserService();
        const allUsers = await userService.getAllUsers();
        res.sendSuccess(allUsers);
      } catch (error) {
        console.error(error);
        res.sendInternalServerError("Error fetching all users");
      }
    });

    this.post('/login', ["PUBLIC"], async (req, res) => {
      const { email, password } = req.body;

      try {
        const user = await userService.findByUsername(email);
        if (!user) {
          console.warn("User doesn't exists with username: " + email);
          return res.status(202).send({ error: "Not found", message: "User not found wit email: " + email });
        }

        if (!isValidPassword(user, password)) {
          console.warn("Invalid credentials for user: " + email);
          return res.status(401).send({ status: "error", error: "Invalid credentials!" });
        }

        const tokenUser = {
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          age: user.age,
          role: user.role,
          photo: user.photo
        };

        const access_token = generateJWToken(tokenUser);
        res.status(200).send({ message: "Login successful!", access_token: access_token, id: user._id, payload: tokenUser });
      } catch (error) {
        console.error(error);
        return res.status(500).send({ status: "error", error: "Internal server error." });
      }
    });

    this.post("/register", ["PUBLIC"], passport.authenticate("register", {
        failureRedirect: "/api/extend/users/fail-register",
        successRedirect: "/api/extend/users/success-register"
      })
    );

    this.get('/logout', ["USER", "USER_PREMIUN", "ADMIN"], (req, res) => {
      res.clearCookie('jwtCookieToken');
      return res.status(200).send("Logout successful");
    });

    this.get("/fail-register", ["PUBLIC"], (req, res) => {
      res.status(400).send({ error: "Failed to process register!" });
    });
    
    this.get("/success-register", ["PUBLIC"], (req, res) => {
      res.status(200).send({ error: "Success register!" });
    });
    
    this.get("/fail-login", ["PUBLIC"], (req, res) => {
      res.status(400).send({ error: "Failed to process login!" });
    });

    this.get("/github", ["PUBLIC"] , passport.authenticate("github", { scope: ['user:email'] }),
    async (req, res) => {
      { }
    });

    this.get("/githubcallback", ["PUBLIC"] , passport.authenticate('github', { failureRedirect: '/github/error' }), 
    async (req, res) => {
      const user = req.user;
      req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
      };
      req.session.admin = true;
      res.redirect("/users");
    });
  }
}