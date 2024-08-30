const express=require("express");
const router=express.Router();
// const {handleGetuser,handleGetByuserId}=require("../controller/user")


router.get("/signup",(req,res)=>{
    return res.render("signup")
})
router.get("/login",(req,res)=>{
    return res.render("login")
})
router.get("/create",(req,res)=>{
    return res.render("createrecipe")
})
router.get("/home",(req,res)=>{
    return res.render("home")
})

module.exports={router}