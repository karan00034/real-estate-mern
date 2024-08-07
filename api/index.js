import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { error } from "console";
import cors from "cors"
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database connected successfully!")
}).catch((error)=>{
  console.log(error)
})

const __dirname=path.resolve();
const app=express();
app.use(express.json());

app.use(cookieParser());
app.use(cors("*"))


app.listen(3000, () => {
    console.log('Server is running on port 3000!');
  });
  
  app.use('/api/user', userRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/listing', listingRouter);
app.get('/',async(req,res)=>{
    res.json({msg:"Everything is fine"})
})
  
  /*
  app.use(express.static(path.join(__dirname, '/client/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  })
  
  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });*/
