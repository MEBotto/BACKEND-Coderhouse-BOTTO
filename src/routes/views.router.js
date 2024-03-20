import { Router } from "express";
const router = Router();
router.get("/", (req, res) => {
    res.render("home.hbs");
});

router.get("/realtimeproducts", (req, res) => {
    res.render("products.hbs");
})

export default router;