import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";

export const signup=async(req,res,next)=>{
    const {username,email,password}=req.body;
    const hashedPass=bcryptjs.hashSync(password,10);
    const user=new User({ username,email,password:hashedPass })
    try{
        await user.save();
        res.status(201).json("User created successfully!!")
    }
    catch(error){
        console.log("Failed to create new user")
        next(error);
    }
}

export const signin=async(req,res,next)=>{
    const {email,password}=req.body;
    try{
        const validUser=await User.findOne({ email })
        if(!validUser) return next(errorHandler(404,"No user found with this email!"))
        const hashedPassword=bcryptjs.compare(password,validUser.password);

        if(!hashedPassword) return next(errorHandler(401,"Wrong credentials!"));
        const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET)
        const {password:pass, ...rest }=validUser._doc;
        res.
        cookie("access_token",token,{ httpOnly:true })
        .status(200).json({rest})
    }
    catch(error){
        console.log("error man cant signin")
        next(error);
        
    }
}

export const google=async(req,res,next)=>{
    try{
        const user=await User.findOne({ email:req.body.email });
        if(user){
            const token=jwt.sign({ id:user._id },process.env.JWT_SECRET );
            const {password:pass, ...rest }=user._doc;
            res.cookie(
                "access_token",token,{ httpOnly:true }
            ).status(200).json(rest)

        }else{
            const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);

        }
    }catch(error){
        next(error)
    }
}


export const signOut=async(req,res,next)=>{
    try{
        res.clearCookie("access_token")
        res.status(201).json("User logged out successfully!")
    }
    catch(error){
        next(error);

    }
}
