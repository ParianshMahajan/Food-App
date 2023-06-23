const express=require('express');

const {getSigned,Signup,getlogin,login,logout,forgotpassword}=require('../Controllers/AuthFuncs.js');

const authRouter=express.Router();

authRouter
.route('/signup')
.get(getSigned)
.post(Signup)

authRouter
.route('/login')
.get(getlogin)
.post(login)

authRouter
.route('/forgotpassword')
.post(forgotpassword)

authRouter
.route('/logout')
.get(logout)


module.exports=authRouter;