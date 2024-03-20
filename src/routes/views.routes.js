import { Router } from "express"
import cartDao from "../daos/dbManager/cart.dao.js"
import productDao from "../daos/dbManager/product.dao.js"
import cookieParser from "cookie-parser"

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
    const products = await productDao.getProducts(limit, page, query, sort)

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

//Middleare auth
// function auth (req, res, next){
//     if (req.session.user === 'Mariano' && req.session.admin){
//         return next()
//     } else {
//         return res.status(403).send('Usuario no autorizado para ingresar a este recurso.')
//     }
// }

// router.get("/private", auth, (req, res) => {
//     res.send('Si estas viendo esto es porque estas autorizado')
// })

router.get("/products/add", (req, res) => {
    res.render("createProduct.hbs")
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