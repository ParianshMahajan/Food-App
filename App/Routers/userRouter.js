const express=require('express');

const {getUser,getallUsers,updateUser,deleteUser,isAuthorised,resetpassword}=require('../Controllers/UserFuncs.js');

const protect=require('../Controllers/protectRouter.js')
// const protect=require('../Controllers/protectRouter.js');

const userRouter=express.Router();



//For a partiicular user
userRouter
.route('/change')
.patch(protect,updateUser)
.delete(protect,deleteUser)


//For user profile
// Again login security issues
// userRouter.use(protectRoute());                 //it is a middlewear function which will always run, nd if it returns next(); then next route will work
userRouter
.route('/profilePage')
.get(protect,getUser);



//Get all users (only done by admin)
//Since we want only admin can access, so we will add a middlewear again
// userRouter.use()                  //it is a middlewear function which will always run, nd if it returns next(); then next route will work
userRouter
.route('')
.get(protect,isAuthorised(['Admin']),getallUsers);



userRouter
.route('/resetpassword/:token')
.post(resetpassword)




module.exports=userRouter;