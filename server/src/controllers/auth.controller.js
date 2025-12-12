import User from '../models/User.model.js'
import {HttpStatus} from 'http-status-codes-helper'
import WrapAsync from '../utils/WrapAsync.js'
import ExpressError from '../utils/ExpressError.js'
import { generateToken } from '../utils/Token.js'
import sendOtp  from '../utils/SendOtp.js'


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

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp

    user.otpExpires = Date.now() + 10 * 60 * 1000; 
    await user.save();

    await sendOtp(email, otp);


    res.status(HttpStatus.CREATED).json({
    success: true,
    message: "6 digits Verification Code is Sent to your mail",
    userId: user._id,
    });
})

export const VerifyOtp = WrapAsync(async (req, res) => {
    const { userId, otp } = req.body;

    const user = await User.findById(userId).select("+otp +otpExpires");

    if (!user) {
        throw new ExpressError(HttpStatus.NOT_FOUND, "User not Found!");
    }

    if (!user.otp || user.otpExpires < Date.now()) {
        throw new ExpressError(HttpStatus.GONE, "Incorrect or Expired OTP!");
    }

    // FIXED OTP CHECK
    if (otp !== user.otp) {
        throw new ExpressError(HttpStatus.UNAUTHORIZED, "Invalid OTP!");
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    const token = generateToken(user._id);

    res.cookie("QuickBite-token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(HttpStatus.CREATED)
    .json({
        success: true,
        message: "User Registered Successfully!",
        user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            mobile: user.mobile,
            profile:user.profile,
            role: user.role
        }
    });
});

export const GoogleSignup = WrapAsync(async (req, res) => {
  const { fullname, email, mobile, role } = req.body;

  let user = await User.findOne({ email });


  if (user) {
    const token = generateToken(user._id);

   res.cookie("QuickBite-token", token, {
      httpOnly: true,
      secure: false, // ✅ true in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });
  }


  user = await User.create({
    fullname,
    email,
    mobile,
    role,
  });
  user.isVerified = true
  await user.save();

  const token = generateToken(user._id);

  res.cookie("QuickBite-token", token, {
    httpOnly: true,
    secure: false, // ✅ true in production
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully!",
    user: {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
    },
  });
});

export const GoogleSignin = WrapAsync(async(req,res)=>{

  const {email} = req.body;
  
  if (!email) {
    throw new ExpressError(HttpStatus.BAD_REQUEST, "Email is required!");
  }

  let user = await User.findOne({ email });

  if(!user)
  {
    throw new ExpressError(HttpStatus.BAD_REQUEST,"User Not Found !")
  }

  const token = generateToken(user._id);

  res.cookie("QuickBite-token", token, {
    httpOnly: true,
    secure: false, // ✅ true in production
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    message: "Login successfully!",
    user: {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
    },
  });

})





export const ResendOtp = WrapAsync(async(req,res)=>{
    const {userId} = req.body
    const user = await User.findById(userId);
    if (!user) throw new ExpressError(HttpStatus.NOT_FOUND, "User not found!");

    if(user.isVerified)
    {
        return res.status(HttpStatus.BAD_REQUEST).json({success:false,message:"User Already Verified, Please signin to Continue"})
    }
    if(user.otpExpires && user.otpExpires > Date.now())
    {
       return res.status(HttpStatus.BAD_REQUEST).json({success:false,message: "OTP already sent! Please wait before trying again"})
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10*60*1000
    await user.save();

    await sendOtp(user.email,otp);
    res.status(HttpStatus.OK).json({success:true,message:"OTP resent SuccessFully !"})
})


export const signin = WrapAsync(async (req, res) => {
  const { email, password } = req.body;


  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ExpressError(HttpStatus.NOT_FOUND, "Invalid Credentials!");
  }



  const isCorrectPassword = await user.comparePassword(password);

  if(!user.isVerified && isCorrectPassword)
  {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    await sendOtp(user.email, otp);

    return res.status(HttpStatus.UNAUTHORIZED).json({success:false,message:"Please Verify Your Account !",userId:user._id})
  }
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
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        mobile: user.mobile,
        profile:user.profile,
        role: user.role,
      },
    });
});


export const signout = WrapAsync((req,res)=>{
    res.clearCookie('QuickBite-token').json({success:true,message:'logout SuccessFully !'})
})



export const forgotpassword = WrapAsync(async (req,res)=>{
  const { email } = req.body;

  const user = await User.findOne({ email });
  if(!user){
    throw new ExpressError(HttpStatus.NOT_FOUND, "User not found!");
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  user.resetOtp = otp;
  user.resetOtpExpires = Date.now() + 2 * 60 * 1000; // 2 min
  user.resetVerified = false;

  await user.save();
  await sendOtp(email, otp);

  res.status(HttpStatus.OK).json({
    success: true,
    message: "4-digit verification code sent to email"
  });
});


export const verifyresetotp = WrapAsync(async (req,res)=>{
  const { email, otp } = req.body;

  const user = await User.findOne({ email })
    .select("+resetOtp +resetOtpExpires");

  if(!user){
    throw new ExpressError(HttpStatus.NOT_FOUND, "User not Found!");
  }

  if(!user.resetOtp || user.resetOtpExpires < Date.now()){
    throw new ExpressError(HttpStatus.GONE, "Incorrect or Expired OTP!");
  }

  if(String(otp) !== String(user.resetOtp)){
    throw new ExpressError(HttpStatus.UNAUTHORIZED, "Invalid OTP!");
  }

  user.resetVerified = true;
  user.resetOtp = null;
  user.resetOtpExpires = null;

  await user.save();

  res.status(HttpStatus.OK).json({
    success: true,
    message: "OTP verified successfully"
  });
});


export const resetPassword = WrapAsync(async (req,res)=>{
    const {email,newpassword} = req.body

    const user = await User.findOne({email}).select("+password");
    if (!user) {
        throw new ExpressError(HttpStatus.NOT_FOUND, "User not Found!");
    }

    if(!user.resetVerified)
    {
        throw new ExpressError(401,"Account is Not verified !")
    }

    user.password = newpassword;

    user.save();

    res.status(HttpStatus.OK).json({success:false,message:"Password reset successfully !"})
})