import express from 'express'
import { forgotpassword, ResendOtp, resetPassword, signin, signout, signup, VerifyOtp, verifyresetotp } from '../controllers/auth.controller.js'
import verifyAuth from '../middlewares/Auth.js';
import { HttpStatus } from 'http-status-codes-helper';

const AuthRouter = express.Router()


AuthRouter.post('/signup',signup);
AuthRouter.post('/signin',signin);
AuthRouter.get('/logout',signout);
AuthRouter.post('/verify-otp',VerifyOtp)
AuthRouter.post('/Resend-otp',ResendOtp)


AuthRouter.get('/verify-user',verifyAuth,(req,res)=>{
    res.status(HttpStatus.OK).json({success:true,message:"User is Authenticated !",user:req.user})
})

AuthRouter.post('/forgotpassword-otp',forgotpassword)
AuthRouter.post('/verify-reset',verifyresetotp)
AuthRouter.post('/resetpassword',resetPassword)

export default AuthRouter