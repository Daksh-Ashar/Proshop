import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
dotenv.config();

export const protect = asyncHandler(async (req,res,next) => {
    let token;
    // Read the JWT from the cookie
    token = req.cookies.jwt;

    if(token){
        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        }catch(e){
            res.status(401).json({
                status:"Failure",
                message:"Not Authorized"
            });
        }
    }else{
        res.status(401).json({
            status:"Failure",
            message:"Not Authorized"
        });
    }
})


// Admin middleware

export const admin = (req,res,next) => {
    if(req.user && req.user.isAdmin)
    {
        next()
    }else{
        res.status(401).json({
            status:"Failure",
            message:"Not Authorized"
        });
    }
}

//export {protect,admin}