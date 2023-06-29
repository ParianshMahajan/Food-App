const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
var validator = require("email-validator");
const crypto=require('crypto')
const {collection1,plans,reviews}=require('./MongoDB');






//UserSchema
const userSchema=mongoose.Schema({

    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,   
        required:true,
        unique:true,
        validate:function(){
            return validator.validate(this.Email);
        }
    },
    Password:{
        type:String,
        required:true,
        minLength:8,
    },
    ConfirmPassword:{
        type:String,
        required:true,
        minLength:8,
        validate:function(){                                                               
            //Confirming Password....
            return this.ConfirmPassword==this.Password;
        }
    },
    PhoneNum:{
        type:Number,
        required:true,
    },
    Username:{
        type:String,
        required:true,
        unique:true,
    },
    Role:{
        type:String,
        enum:['Admin','User','Restaurant Owner','Delivery Boy'],
        default:'User'
    },
    ProfileURL:{
        type:String,                                //bcoz we will sent the image link which is a string
        default:'img/users/default.jpeg'            //if user din't uploaded his image, so default image 
    },
    resetToken:String
})


userSchema.pre('save',function(){
    this.ConfirmPassword=undefined;
});

userSchema.methods.createResetToken=function(){
    //creating unique token using crypto
    const resetToken=crypto.randomBytes(32).toString("hex"); 
    this.resetToken=resetToken;
    return resetToken;
}



















//PlansSchema
const planSchema=mongoose.Schema({

    Name:{
        type:String,
        required:true,
        maxLength:[20,"Name cannot be exceeded by 20 words"]
                //[value, error when this invalidates]
    },
    Duration:{
        type:Number,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    Ratings:{
        type:Number,
    },
    Discount:{
        type:Number,
        validate:function(){
            return this.Discount<100
        }
    }
})













//ReviewSchema
const reviewSchema=mongoose.Schema({

    Review:{
        type:String,
        required:[true,'Review is required']
    },
    Rating:{
        type:Number,
        min:1,
        max:10,
        required:[true,"Rating is required"]
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    User:{
        type:mongoose.Schema.ObjectId,
        ref:'collection1',
        required:[true,'Review must belong to a user']
    },
    Plan:{
        type:mongoose.Schema.ObjectId,
        ref:'plans',
        required:[true,'Review must belong to a plan']
    },
})


//Adding hook to populate ids in plan and user

//Here we used regex expression i.e whenevr a function like find, findbyid, findone is called, it will get executed

reviewSchema.pre(/^find/,function(next){
    this.populate({
        path:"User",             //Where we want to populate
        select:"Name ProfileURL"        //What we wan to fetch
    })
    .populate("Plan")               //Here we want to populate whole plan schema(whole properties...)
    next();
})














module.exports={userSchema,planSchema,reviewSchema};