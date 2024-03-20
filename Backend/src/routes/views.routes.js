import { Router } from "express"
import { getProducts } from "../services/db/product.service.js"

const router = Router();

router.get("/", (req, res) => {
    res.render("home.hbs")
})

router.get("/logout", (req, res) => {
    req.session.destroy(error => {
        if(error){
            res.json({ error: 'Error logout', message: 'Error al cerra la sesion' })
        }else{
            res.send('Sesion cerrada correctamente')
        }
    })
})

router.get("/products", async (req, res) => {
    const { limit, page, query, sort } = req.query
    const products = await getProducts(limit, page, query, sort)

    // Añade los datos del usuario a la renderización de la vista
    const userData = req.session.user;
    console.log(req.session.user)
    const welcomeMessage = userData ? `¡Bienvenido, ${userData.name}!` : 'Bienvenido';

    res.render("products.hbs", { products, user: userData, welcomeMessage }, (err, html) => {
        if (err) {
            throw err
        }
        res.send(html)
    })
})

router.get("/products/add", (req, res) => {
    res.render("createProduct.hbs")
})

router.get("/chat", (req, res) => {
    res.render("chat.hbs");
})

export default router