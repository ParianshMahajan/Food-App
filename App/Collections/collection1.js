const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
var validator = require("email-validator");
const crypto=require('crypto')

const db_link='mongodb+srv://parianshm:15903570Pm@cluster1.1yyn5jp.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(i){
    console.log('Database Connected');
})
.catch(function(err){
    console.log(err);
})


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




const collection1=mongoose.model('collection1',userSchema);


collection1.methods.createResetToken=function(){
//creating unique token using crypto
    const resetToken=crypto.randomBytes(32).toString("hex"); 
    this.resetToken=resetToken;
    return resetToken;
}


module.exports=collection1;