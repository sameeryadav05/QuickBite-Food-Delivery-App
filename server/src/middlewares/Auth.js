import express from 'express';
import {HttpStatus} from 'http-status-codes-helper'
import { verifyToken } from '../utils/Token.js';
import ExpressError from '../utils/ExpressError.js';

const verifyAuth = (req,res,next)=>{
    try {
        const token = req.cookies?.["QuickBite-token"];

        if(!token)
        {
            return res.status(HttpStatus.UNAUTHORIZED).json({success:false,message:"session expired, please login again !"})
        }
        const decoded = verifyToken(token);
        req.userId = decoded.userId;
        
        console.log(req)
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
}

export default verifyAuth;