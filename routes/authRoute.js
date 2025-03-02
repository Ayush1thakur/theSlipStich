const express= require("express");
const { login, signUp, testC, verifyOtp, resendOtp } = require("../controllers/authC");
const { isUser, isAdmin } = require("../middleware/authM");
const router= express.Router();

// routing

// sign up
router.post('/signUp',signUp);
// login
router.post('/login',login);
// test/protected route
router.get("/test",isUser,isAdmin,testC);
// verify otp
router.post("/verifyOtp",verifyOtp);
// resend otp
router.post("/resendOtp",resendOtp);

module.exports = router;