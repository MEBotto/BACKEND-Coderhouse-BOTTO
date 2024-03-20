import { Router } from "express";

const router = Router();

router.get("/login", (req, res) => {
    res.render("github-login.hbs");
});

router.get("/error", (req, res) => {
    res.render("error.hbs", { error: "Failed to authenticate using GitHub" });
});

export default router;