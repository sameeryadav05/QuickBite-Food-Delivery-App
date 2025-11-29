import express from 'express';
import dotenv from 'dotenv';
import ConnectDb from './config/Db.js';
import ExpressError from './utils/ExpressError.js'
import {HttpStatus} from 'http-status-codes-helper'
import mainRouter from './Routes/Main.Route.js';
import cookieparser from 'cookie-parser'
import cors from 'cors'
import Redis from 'ioredis'
dotenv.config();



const app = express();
const port = process.env.PORT || 5000

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())
app.use(cors({
    origin:process.env.CLIENT_URI,
    credentials:true
}))


// Router
app.use('/api',mainRouter);

//404 handler
app.use((req,res,next)=>{
    next(new ExpressError(HttpStatus.NOT_FOUND,"Path Not found !"))
})
// global Error Handler 
app.use((err,req,res,next)=>{
    const {status=HttpStatus.INTERNAL_SERVER_ERROR,message="Internal Server Error"} = err
    res.status(status).json({success:false,message:message})
})

export const redis = new Redis({
    host:process.env.HOST,
    port:process.env.REDIS_PORT,
    password:process.env.REDIS_PASSWORD,
})

redis.on('connect',()=>console.log("connected to redis"))


ConnectDb().then(()=>app.listen(port,()=>console.log(`Server is Running ${port}`))).catch(err=>console.log(err.message))
