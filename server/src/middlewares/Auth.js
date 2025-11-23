import express from 'express';
import {HttpStatus} from 'http-status-codes-helper'
import { verifyToken } from '../utils/Token.js';
import ExpressError from '../utils/ExpressError.js';
import  WrapAsync from '../utils/WrapAsync.js';
import User from '../models/User.model.js'
const verifyAuth = WrapAsync(async(req,res,next)=>{
    try {
        const token = req.cookies?.["QuickBite-token"];

        if(!token)
        {
            throw new ExpressError(HttpStatus.UNAUTHORIZED,"session expired, please login again !")
        }
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.userId);
        if(!user)
        {
            throw new ExpressError(HttpStatus.UNAUTHORIZED,"session expired, please login again !");
        }   
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