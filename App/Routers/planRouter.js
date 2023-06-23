const express=require('express');
const {collection1,plans}=require('../Collections/collection1');


const planRouter=express.Router();

planRouter
.route('')
.get(getPlans)
.post(enterPlans)



async function getPlans(req,res){
    try {
        let user=await plans.find();
        res.json({
            Users:user
        });
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}


async function enterPlans(req,res){
    try {
        let data=req.body
        let plan=await plans.create(data)

        console.log(data);
            
        res.json({
            message:"Plan Added",
            data:data                       
        });

    } catch (error) {
        res.json({
            message:error.message
        })
    }
}



module.exports=planRouter