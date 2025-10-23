const express=require("express")
const { register, login, logout, googlelogin,adminlogin } = require("../controller/AuthController")

const router=express.Router()
router.post("/register",register)
router.post("/login",login)
router.post("/googlelogin",googlelogin)
router.delete("/logout",logout)
router.post('/adminlogin',adminlogin)
module.exports=router