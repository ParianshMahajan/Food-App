const express=require('express');
const fs = require('fs');
const cors=require('cors');
const app=express();

app.use(cors());
app.use(express.json());
const cookieParser=require('cookie-parser');
app.use(cookieParser());  


const userRouter=require('./Routers/userRouter');
const authRouter=require('./Routers/authRouter');
const planRouter = require('./Routers/planRouter');


app.use('/user',userRouter);
app.use('/auth',authRouter);
app.use('/plan',planRouter);





const port = process.env.PORT || 7000;
const host = '127.0.0.1';

app.listen(port, host, () => console.log(`http://${host}:${port}`));
