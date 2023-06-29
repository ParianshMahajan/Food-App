const express=require('express');
const {collection1,plans,reviews}=require('../Collections/MongoDB');
const { isAuthorised } = require('../Controllers/UserFuncs');
const protect = require('../Controllers/protectRouter');
const { getAllReviews, top3reviews, getPlanReviews, createReview, updateReview, deleteReview } = require('../Controllers/ReviewFuncs');

const reviewRouter=express.Router();

//Admin

reviewRouter
.route('/allreviews')
.get(getAllReviews)


//reviews of a particular plan
reviewRouter
.route('/plan/:id')
.get(getPlanReviews)
.post(protect,createReview)


reviewRouter
.route('/:id')
.patch(protect,updateReview)
.delete(protect,deleteReview)




//top 3 Reviews
reviewRouter
.route('/top3reviews')
.get(top3reviews)


module.exports=reviewRouter