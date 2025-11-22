import nodemailer from "nodemailer";

async function sendOtp(email,otp){
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
}


export default sendOtp;