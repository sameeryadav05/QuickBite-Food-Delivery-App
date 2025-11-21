import express from 'express';
import userRouter from './User.route.js';
import AuthRouter from './Auth.route.js';


const mainRouter = express.Router();


mainRouter.use('/auth',AuthRouter)
mainRouter.use('/user',userRouter);


export default mainRouter;