import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const port = process.env.PORT || 5500
app.listen(port,()=>{
    console.log("Server is Running")
})