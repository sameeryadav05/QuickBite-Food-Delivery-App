
import mongoose from 'mongoose';


const ConnectDb = async ()=>{
    await mongoose.connect(process.env.MONGODB_URI,{dbName:"QuickBite"});
    console.log("Database Connected Successfully !");
}

export default ConnectDb;