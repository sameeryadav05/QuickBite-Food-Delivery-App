import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required:true,
        trim: true,
    },
    email:{
        type: String,
        required:true,
        trim: true,
        unique: true,
        lowercase: true,
        validate:{
            validator:function (value){
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            },
            message:"Invalid Email Id !"
        }
    },
    password:{
       type: String,
       select:false,
    },
    mobile:{
        type: String,
        required:true
    },
    profile:{
        type:String,
        default:"https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png"
    },
    role:{
        type: String,
        enum:["user","owner","deliveryboy"],
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    otp:String,
    otpExpires:Date,
    resetOtp:String,
    resetOtpExpires:Date,
    resetVerified: {
        type: Boolean,
        default: false,
    },
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});


userSchema.methods.comparePassword = async function(plainPassword){
    return await bcrypt.compare(plainPassword,this.password)
}


const User = mongoose.model("User",userSchema);

export default User