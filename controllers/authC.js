const User= require("../models/User")
const {hashPassword, comparePassword}= require("../utils/hashing")
const jwt = require("jsonwebtoken")
const OTP = require("../models/OTP")
const otpGenerator = require("otp-generator")
const otpTemplate= require("../mailTemplate/otpTemplate");
const {mailSender}= require("../utils/emailSender")
require("dotenv").config()

// signup
exports.signUp= async (req,res,next) => {
    try {
        const {name,email,password,phone,confirmPassword}= req.body;
        // validation
        if(!email || !password || !name || !phone || !confirmPassword){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            });
        }

        // password match
        if (password !== confirmPassword) {
            return res.status(401).json({
            success: false,
            message: "password & confirmPassword does not match, please try again",
            });
        }

        // check for registered user
        const existingUser = await User.findOne({email});
        if(existingUser){
            if(existingUser.verified){
                return res.status(400).send({
                    success:true,
                    message:'Already Registered',
                });
            }else{
                await OTP.deleteMany({_id:existingUser._id})
                await User.deleteMany({email});
            }
            
        }

        // register user
        const hashedPassword= await hashPassword(password);
        const user = new User({name,email,phone,password:hashedPassword});

        await user.save();
        return sendOtp(email,user._id,res);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Cannot create User please try it later",
        });
    }
};

exports.login=async (req,res,next) => {
    try {
        const {email,password}= req.body;

        if(!email || !password){
            return res.status(400).send({
                success:false,
                message:"Please fill all the details carefully"
            })
        }

        const user=await User.findOne({email});
        if(!user || !user.verified){
            return res.status(404).send({
                success:false,
                message:"User not found"
            })
        }

        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                sucess:false,
                message:"Invalid Password"
            })
        }

        // create jwt
        const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.status(200).send({
            success:true,
            message:"login successfully",
            user:{
                name:user.name,
                email: user.email,
                phone: user.phone,
                address:user.address
            },
            token
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Somthing went wrong while signing in",
        })
    } 
}

// test controller
exports.testC= (req,res)=>{
    res.send("protected route");
}


// Send OTP For Email Verification
const sendOtp = async (email,_id,res) => {
    try {
  
      var otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      })
      const body= await otpTemplate(otp);
      const hashedOTP= await hashPassword(otp);

      const newotp= await OTP.create({
        _id:_id,
        otp: hashedOTP,
        createdAt:Date.now(),
        expiresAt:Date.now()+300000,
      })


      await mailSender(email,"Verify your Email",body);


      return res.status(200).json({
        success: true,
        message: `OTP Sent Successfully`,
        newotp,
      })
      
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        success: false,
        message: `Failed to send OTP`,
      })
    }
  }

//   verify OTP
exports.verifyOtp= async(req,res)=>{
    try {
         let {email,otp}= req.body;
         const user= await User.findOne({email});
         const _id= user._id;
         if(!email || !otp){
            return res.status(400).send({
                success:false,
                message:"Incomplete OTP details"
            })
         }

         const hOtp= await OTP.find({_id});
        //  otp doesn't exist
         if(hOtp.length<=0){
            return res.status(404).send({
                success:false,
                message:"OTP doesn't exist or has been verified already. Please sign up or login."
            })
         }

        //  check for expiry
        const {expiresAt} = hOtp[0];
        const hashedOTP = hOtp[0].otp;
        if(expiresAt < Date.now()){
            await OTP.deleteMany({_id});
            return res.status(401).send({
                success:false,
                message:"OTP expired. Please request again."
            })
        }

        // verify otp
        const validOtp= await comparePassword(otp,hashedOTP);
        if(!validOtp){
            return res.status(400).send({
                success:false,
                message:"OTP didn't match"
            })
        }

        await User.updateOne({_id:_id},{verified:true});
        await OTP.deleteMany({_id});
        return res.status(200).json({
            success: true,
            message: `User email verified Successfully`
          })
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: `Failed to verify OTP`,
        })
    }
};


// resending otp & deleting others

exports.resendOtp= async (req,res)=>{
    try {
        const {email}= req.body;
        const user= await User.findOne({email});
        const _id= user._id;
        if(!_id || !email){
            return res.status(400).send({
                success:false,
                message:"Incomplete resend OTP details"
            })
        }

        await OTP.deleteMany({_id});
        await sendOtp(email,_id,res);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: `Failed to resend OTP`,
        })
    }
}

// forgot password

exports.forgotPass= async(req,res)=>{
    const {email}= req.body;
    const user= await User.findOne({email:email, verified:true});

    if(!user){
        return res.status(404).send({
            success:false,
            message:"User not found"
        })
    }

    
}