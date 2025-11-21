import express from 'express'
import { signin, signout, signup } from '../controllers/auth.controller.js'

const AuthRouter = express.Router()


AuthRouter.post('/signup',signup);
AuthRouter.post('/signin',signin);
AuthRouter.get('/logout',signout);


export default AuthRouter