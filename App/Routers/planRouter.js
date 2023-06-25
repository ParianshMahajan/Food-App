const express=require('express');
const {collection1,plans}=require('../Collections/collection1');
const {getAllPlans,createPlans,UpdatePlan,deletePlan,getPlan,top3plans}=require('../Controllers/PlansFuncs');
const { isAuthorised } = require('../Controllers/UserFuncs');
const protect = require('../Controllers/protectRouter');

const planRouter=express.Router();

//Admin

planRouter
.route('/admin')
.post(protect,isAuthorised(['Admin']),createPlans)

planRouter
.route('/admin/:id')
.patch(protect,isAuthorised(['Admin']),UpdatePlan)
.delete(protect,isAuthorised(['Admin']),deletePlan)



//Current plan of the user
planRouter
.route('/userplan/:id')
.get(getPlan)



planRouter
.route('/allplans')
.get(getAllPlans)




//top 3 plans
planRouter
.route('/top3plans')
.get(top3plans)


module.exports=planRouter