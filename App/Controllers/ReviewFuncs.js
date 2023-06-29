const {collection1,plans,reviews}=require('../Collections/MongoDB');
const jwt=require('jsonwebtoken');
const secret_key='asdfghjkl';


module.exports.getAllReviews=async function getAllReviews(req,res){
    try {
        let review =await reviews.find();
        if(review){
            res.json({
                "All Reviews":review
            });
        }
        else{
            res.json({
                message:"No reviews on any plan yet.."
            })
        }
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}







module.exports.getPlanReviews=async function getPlanReviews(req,res){
    try {
        let review =await reviews.find({Plan:req.params.id});
        if(review){
            res.json({
                "Entered Plan reviews":review
            });
        }
        else{
            res.json({
                message:"No reviews on any plan yet.."
            })
        }
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}



module.exports.createReview=async function createReview(req,res){
    try {
        let data=req.body;    //object containing review, rating, and date only
        data.User=req.id;
        data.Plan=req.params.id;
        
        //Updating average Rating
        let plan=await plans.findById(req.params.id)
        let totalReviews=await reviews.find({Plan:req.params.id}).count()
        let newRating=(parseFloat(plan.Ratings)+parseFloat(data.Rating))/(parseInt(totalReviews)+1);
        let abc=await plans.findByIdAndUpdate(req.params.id,{Ratings:(newRating).toFixed(1)})
        

        let review=await reviews.create(data)
        res.json({
            "Review Created":review
        })
        

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}





module.exports.updateReview=async function updateReview(req,res){
    try {
        let data=req.body;    
        let review=await reviews.findById(req.params.id)
        
        if(review.User==req.id){
            
            //Updating Rating
            if(data.Rating){
                let plan=await plans.findById(review.Plan)
                let totalReviews=await reviews.find({Plan:review.Plan}).count()
                let newRating=parseFloat(plan.Ratings)+((parseFloat(data.Rating)-review.Rating)/(parseInt(totalReviews)));
                let abc=await plans.findByIdAndUpdate(review.Plan,{Ratings:(newRating).toFixed(1)})
            }



            let abc=await reviews.findByIdAndUpdate(req.params.id,data)
        }
        else{
            res.json({
                message:"This review does not belongs to you, So you can't edit."
            })
        }

        res.json({
            message:"Review Updated"
        })
        

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}






module.exports.deleteReview=async function deleteReview(req,res){
    try {
        let review=await reviews.findById(req.params.id)
        
        if(review.User==req.id){
            let plan=await plans.findById(review.Plan)
            let totalReviews=await reviews.find({Plan:review.Plan}).count()
            let newRating=(((parseFloat(plan.Ratings))*(parseInt(totalReviews)))-review.Rating)/(parseInt(totalReviews)-1);
            let def=await plans.findByIdAndUpdate(review.Plan,{Ratings:(newRating).toFixed(1)})

            let abc=await reviews.findByIdAndDelete(req.params.id)
        }
        else{
            res.json({
                message:"This review does not belongs to you, So you can't edit."
            })
        }

        res.json({
            message:"Review deleted"
        })
        

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}





















module.exports.top3reviews=async function top3reviews(req,res){
    try {
        let review =await reviews.find().sort({createdAt:-1}).limit(3);
        if(review){
            res.json({
                "Top 3 Reviews":review
            });
        }
        else{
            res.json({
                message:"No reviews on any plan yet.."
            })
        }
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}


