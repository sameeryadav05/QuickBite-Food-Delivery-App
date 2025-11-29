import nodemailer from "nodemailer";
import ExpressError from "./ExpressError.js";
import { HttpStatus } from "http-status-codes-helper";

async function sendOtp(email,otp){
    try {
            const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL,
            pass:process.env.APP_PASSWORD
        }
    })
    
    const mailOptions = {
        from:process.env.EMAIL,
        to:email,
        subject: "QuickBite Email Verification OTP",
        html: `<h2>Your OTP is: <b>${otp}</b></h2>
           <p>This OTP is valid for 10 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("failed to send email");
        throw new ExpressError(HttpStatus.INTERNAL_SERVER_ERROR,"Failed to send email")
    }
}


export default sendOtp;