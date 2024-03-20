import { Router } from "express"
import cartDao from "../daos/dbManager/cart.dao.js"
import productDao from "../daos/dbManager/product.dao.js"

const router = Router();
router.get("/", (req, res) => {
    res.render("home.hbs");
});

router.get("/realTimeProducts", async (req, res) => {
    const { limit, page, query, sort } = req.query
    const products = await productDao.getProducts(limit, page, query, sort)

    res.render("products.hbs", {products})
})

router.get("/chat", (req, res) => {
    res.render("chat.hbs");
})

router.get("/carts/:id", async (req, res) => {
    const { id } = req.params
    const products = await cartDao.getProductsFromCart(id)
    console.log(products)
    res.render("cart.hbs", {products})
})

export default router