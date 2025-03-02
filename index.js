// npm i express nodemon dotenv mongoose cookie-parser jsonwebtoken nodemailer otp-generator bcrypt

const express = require("express");
const { connectDB } = require("./config/database");
const authRoutes = require("./routes/authRoute");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes= require("./routes/productRoutes");
require("dotenv").config();
const cors= require("cors");

// database connect
connectDB();

// rest object
const app= express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);

// rest api
app.get('/', (req,res)=>{
    res.send("<h1>welcome</h1>")
})

// port
const PORT= process.env.PORT || 4000;

// run/listen
app.listen(PORT, ()=>{
    console.log(`Server Running on ${PORT}`);
})