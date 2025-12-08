import express from 'express';
import {HttpStatus} from 'http-status-codes-helper'
import { verifyToken } from '../utils/Token.js';
import ExpressError from '../utils/ExpressError.js';
import  WrapAsync from '../utils/WrapAsync.js';
import User from '../models/User.model.js'
import {redis} from '../server.js'
const verifyAuth = WrapAsync(async(req,res,next)=>{
    try {
        const token = req.cookies?.["QuickBite-token"];

        if(!token)
        {
            throw new ExpressError(HttpStatus.UNAUTHORIZED,"session expired, please login again !")
        }
        const decoded = verifyToken(token);
 
        const id = decoded.userId

        const cachedUser = await redis.get(`user:${id}`)

        if(cachedUser)
        {
            const user = JSON.parse(cachedUser);
            req.user = {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                mobile: user.mobile,
                role: user.role,
                isVerified: user.isVerified,
            };
            return next();
        }

        const user = await User.findById(id);
        if(!user)
        {
            throw new ExpressError(HttpStatus.UNAUTHORIZED,"session expired, please login again !");
        } 
        // await redis.set(`user:${id}`,JSON.stringify(user),'EX',120);
        
        req.user = {
            id:user._id,
            fullname:user.fullname,
            email:user.email,
            mobile:user.mobile,
            role:user.role,
            isVerified:user.isVerified
        };
        next();

    } catch (error) {
        throw new ExpressError(401,"Invalid or expired token !")
    }
})

export default verifyAuth;