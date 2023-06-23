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

const {userSchema,planSchema}=require("./schemas")



//Collection1 users
const collection1=mongoose.model('collection1',userSchema);





//Plans
const plans=mongoose.model('plans',planSchema);



module.exports={collection1,plans};