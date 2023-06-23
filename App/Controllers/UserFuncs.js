const {collection1}=require('../Collections/collection1');

const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
app.use(cookieParser);

const jwt=require('jsonwebtoken');
const secret_key='asdfghjkl';





//Profile Page
module.exports.getUser= async function getUser(req,res){
    let id =req.id;     
    console.log(id);                     
    //Since the route is '/profilepage' we get id in params as we used a middlewear protectroute which will add id to thed req.id....

    let user=await collection1.findById(id);

    if(user){
        res.json({
            Users:user
        });
    }
    else{
        res.json({
            message:'User not found'
        });
    }
}







//All users by admin
//isAuthorised -> to check the user's role [Admin,User,RestaurantOwner,DeliveryBoy]

module.exports.isAuthorised=function isAuthorised(roles){
    return async function(req,res,next){
        if(roles.includes(req.role)==true){          //Since from frontend roles=['admin'], so if req.role=='admin' only then it will be true;
            next();            
        }
        else{
            res.status(401).json({
                message:'Operation not allowed'
            })
        }
    }
}

module.exports.getallUsers= async function getallUsers(req,res){
    let user=await collection1.find();
    res.json({
        Users:user
    });
}








//Updation/Deleiton

module.exports.updateUser= async function updateUser(req,res){
    try{
        let data=req.body;
        let id =req.id;              // Since we are using '/:id', so the user id is stored in req.params.id
            

        // 1st method of updating
        // let user=await collection1.findByIdAndUpdate(id,data);       

        // 2nd method of updating
        let user=await collection1.findById(id);

        if(user){
            let abc=await collection1.updateOne(user,data)

            res.json({
                message:'Data updated succesfully',
            });
        }
        else{
            res.json({
                message:'User not found'
            });
        }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}

module.exports.deleteUser= async function deleteUser(req,res){
    try{
        let id =req.params.id;                
        let user=await collection1.findByIdAndDelete(id);
        
        if(user){
            res.json({
                message:'Account deleted succesfully' 
            });
        }
        else{
            res.json({
                message:'User not found' 
            });
        }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}









//Resetpassword
module.exports.resetpassword= async function resetpassword(req,res){
    try{
        let data =req.data;
        
        if(data.Password==data.ConfPassword){
            res.clearCookie('isLoggedIn');
            let user=await collection1.findOne({resetToken:req.params.token});
            let abc=await collection1.updateOne(user,{Password:data.Password,resetToken:undefined})
            const uuid=user._id;
            const token=jwt.sign({payload:uuid},secret_key);
            res.cookie('isLoggedIn',token,{
                maxAge:1000*60*60*24
            });
            

            res.json({
                message:'Password Reset successfully' 
            });
        }
        else{
            res.json({
                message:'Password does not match with confirm password' 
            });            
        }
        
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}




