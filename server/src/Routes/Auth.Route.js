import express from 'express'
import { ResendOtp, signin, signout, signup, VerifyOtp } from '../controllers/auth.controller.js'

const AuthRouter = express.Router()


AuthRouter.post('/signup',signup);
AuthRouter.post('/signin',signin);
AuthRouter.get('/logout',signout);
AuthRouter.post('/verify-otp',VerifyOtp)
AuthRouter.post('/Resend-otp',ResendOtp)


export default AuthRouter