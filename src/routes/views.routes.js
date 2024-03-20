import { Router } from "express"
import cartDao from "../daos/dbManager/cart.dao.js"
import productDao from "../daos/dbManager/product.dao.js"
import cookieParser from "cookie-parser"

const router = Router();

//Sin firma 
//router.use(cookieParser())

//Con Firma 
router.use(cookieParser('fhFo3g9K4j0cfR2'))

router.get("/", (req, res) => {
    res.render("home.hbs")
})

router.get("/setCookie", (req, res) => {
    //Sin Firma
    //res.cookie('MarianoCookie', 'Esta es una cookie sin firma!!', { maxAge: 30000, }).send('Cookie asignada con éxito')

    //Con Firma
    res.cookie('MarianoCookie', 'Esta es una cookie sin firma!!', { maxAge: 30000, signed: true }).send('Cookie asignada con éxito')
})

router.get("/getCookie", (req, res) => {
    //Sin Firma
    //res.send(req.cookies)

    //Con Firma
    res.send(req.signedCookies)
})

router.get("/deleteCookie", (req, res) => {
    //Sin Firma
    res.clearCookie('MarianoCookie').send('Cookie borrada!!!')
})

router.get("/session", (req, res) => {
    if(req.session.counter){    
        req.session.counter++
        res.send(`Se ha visitado este sitio ${req.session.counter} veces.`)
    }else{
        req.session.counter = 1
        res.send('Bienvenido!!!')
    }
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
    console.log(req.session.user.rol)
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