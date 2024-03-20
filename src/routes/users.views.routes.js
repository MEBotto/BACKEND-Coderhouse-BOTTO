import { Router } from 'express'

const router = Router();

router.get("/login", (req,res)=>{
    res.render('login.hbs')
})

router.get("/register", (req,res)=>{
    res.render('register.hbs')
})

router.get("/", (req,res)=>{
    res.render('profile.hbs', { user: req.session.user })
})

export default router