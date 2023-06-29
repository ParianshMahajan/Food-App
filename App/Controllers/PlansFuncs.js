const {collection1,plans}=require('../Collections/MongoDB');
const jwt=require('jsonwebtoken');
const secret_key='asdfghjkl';


module.exports.getAllPlans= async function getAllPlans(req,res){
    try {
        let plan=await plans.find();
        res.json({
            Plans:plan
        });
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}





module.exports.getPlan= async function getPlan(req,res){
    try {
        let plan=await plans.findById(req.params.id)
        if(plan){
            res.json({
                "Current Plan":plan
            });
        }
        else{
            res.json({
                message:"You don't have a plan"
            });
        }
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}







module.exports.createPlans= async function createPlans(req,res){
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



module.exports.UpdatePlan= async function UpdatePlan(req,res){
    try {
        let data=req.body
        let id =req.params.id;              // Since we are using '/:id', so the plan's id is stored in req.params.id

        let plan=await plans.findById(id);

        if(plan){
        let abc=await plans.findByIdAndUpdate(id,data)

            res.json({
                message:'Plan updated succesfully',
            });
        }
        else{
            res.json({
                message:'Plan not found'
            });
        }
    } catch (error) {
        res.json({
            message:error.message
        })
    }

}


module.exports.deletePlan= async function deletePlan(req,res){
    try {
        let id=req.params.id;
        let plan=await plans.findById(id);

        if(plan){
            let abc=await plans.deleteOne(plan)

            res.json({
                message:'Plan deleted succesfully',
            });
        }
        else{
            res.json({
                message:'Plan not found'
            });
        }

    } catch (error) {
        res.json({
            message:error.message
        })
    }

}



module.exports.top3plans= async function top3plans(req,res){
    try {
        let id=req.params.id;
        let top3=await plans.find().sort({Ratings:-1}).limit(3);

        if(top3){
            res.json({
                top3plans:top3,
            });
        }
        else{
            res.json({
                message:'Plans not found'
            });
        }

    } catch (error) {
        res.json({
            message:error.message
        })
    }

}



