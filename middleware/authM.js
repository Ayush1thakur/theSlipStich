const jwt=require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// protected routes token base
exports.isUser= async (req,res,next) => {
    try {
        const decode= jwt.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user=decode;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send({
            success:false,
            message:"error in isUser middleware",
            error
        })
    }
};

// admin access
exports.isAdmin=async (req,res,next) => {
    try {
        const user=await User.findById(req.user._id);
        if(user.role!=1){
            return res.status(401).send({
                success:false,
                message:"UnAuthorizes Access"
            })
        }else{
            next();
        }
    } catch (error) {
        console.error(error);
        res.status(401).send({
            success:false,
            message:"error in isAdmin middleware",
            error
        })
    }
}