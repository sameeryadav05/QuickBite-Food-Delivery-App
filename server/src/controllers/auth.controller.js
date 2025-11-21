import User from '../models/User.model.js'
import {HttpStatus} from 'http-status-codes-helper'
import WrapAsync from '../utils/WrapAsync.js'
import ExpressError from '../utils/ExpressError.js'
import { generateToken } from '../utils/Token.js'


export const signup = WrapAsync(async (req,res)=>{
    const {fullname,email,password,mobile,role} = req.body

    if(password.length<6)
    {
        throw new ExpressError(HttpStatus.BAD_REQUEST,"Password must be of atleast 6 characters")
    }
    if(mobile.length<10)
    {
        throw new ExpressError(HttpStatus.BAD_REQUEST,"Invalid Mobile Number !")
    }
    const isUserExist = await User.findOne({email});
    if(isUserExist)
    {
       return res.status(HttpStatus.FORBIDDEN).json({success:false,message:"user already exist"})
    }

    const user = await User.create({
        fullname,email,password,mobile,role
    })
    const token = generateToken(user._id)
    res.cookie("QuickBite-token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }).status(HttpStatus.CREATED).json({
        success:true,
        message:"User Registered Successfully !",
        user:{
            id:user._id,
            fullname:user.fullname,
            email:user.email,
            mobile:user.mobile,
            role:user.role
        }
    })
})

export const signin = WrapAsync(async (req, res) => {
  const { email, password } = req.body;


  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ExpressError(HttpStatus.NOT_FOUND, "Invalid Credentials!");
  }


  const isCorrectPassword = await user.comparePassword(password);
  if (!isCorrectPassword) {
    throw new ExpressError(HttpStatus.UNAUTHORIZED, "Invalid Credentials!");
  }


  const token = generateToken(user._id);

  res.cookie("QuickBite-token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(HttpStatus.OK)
    .json({
      success: true,
      message: "Sign-in Successful!",
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });
});


export const signout = WrapAsync((req,res)=>{
    res.clearCookie('QuickBite-token').json({success:true,message:'logout SuccessFully !'})
})

