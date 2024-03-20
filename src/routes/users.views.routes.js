import { Router } from "express";
import { authToken, authorization, passportCall } from "../utils.js";
import passport from "passport";

const router = Router();

router.get("/login", (req, res) => {
    res.render("login.hbs");
});

router.get("/register", (req, res) => {
    res.render("register.hbs");
});

// passport.authenticate('jwt', {session: false})
// authorization("admin")
router.get("/", passportCall('jwt'), (req,res)=>{
    res.render('profile.hbs', { user: req.user })
});

router.get("/error", (req, res) => {
    res.render("error");
})

export default router;