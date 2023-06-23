const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
var validator = require("email-validator");
const crypto=require('crypto')




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
    Price:{
        type:Number,
        required:true,
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





module.exports={userSchema,planSchema};