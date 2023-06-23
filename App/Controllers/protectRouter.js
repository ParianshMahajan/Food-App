const collection1=require('../Collections/collection1');
const jwt=require('jsonwebtoken');
const secret_key='asdfghjkl';

async function protect(req,res,next){
    
    try{
        if(req.cookies.isLoggedIn){                                              
            let payload=jwt.verify(req.cookies.isLoggedIn,secret_key);               
  
            if(payload){
                let user= await collection1.findById(payload.payload);              
                req.role=user.Role;
                req.id=user._id;  
                next();
            }
            else{
                return res.json({
                    message:"I got you :)"
            })
            }
        }
   
        else{                                                               
            return res.json({
                message:"Login first"
           })
       }
   }
   catch(err){
       return res.json({
           message:err.message
       })
   }
}



module.exports=protect;