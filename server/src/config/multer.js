import multer from 'multer'
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import cloudinary from './Cloudinary.js'

const ProfileStorage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"QuickBite_Profile",
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
    }
});

const ProfileUpload = multer({ storage:ProfileStorage })

export default ProfileUpload;