const express = require("express");
const { connectDB } = require("./config/database");
require("dotenv").config();
const cors= require("cors");
const sequelize = require("./config/sequaliseDB");

const User = require("./models/User");
const Country = require("./models/country");
const Customer = require("./models/customer");
const Dept_Desig = require("./models/department_desig");
const Department = require("./models/department");
const Designations = require("./models/designation");

const authRoutes = require("./routes/authRoute");
const productRoutes= require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const countryRoutes = require('./routes/countryRoutes');
const customerRoutes = require("./routes/customerRoutes");
const deptDesigRoutes = require('./routes/deptDesigRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const designationRoutes = require('./routes/designationRoutes');
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
app.use("/customers", customerRoutes);
app.use("/countries", countryRoutes);
app.use('/dept-desig', deptDesigRoutes);
app.use('/departments', departmentRoutes);
app.use('/designations', designationRoutes);

// rest api
app.get('/', (req,res)=>{
    res.send("<h1>welcome</h1>")
})

// port
const PORT= process.env.PORT || 4000;

// run/listen
app.listen(PORT, async()=>{
    try {
        console.log(`Server Running on ${PORT}`);
        // sql connection
        // await sequelize.authenticate();
        // await Customer.sync({});
        await Designations.sync({});
        console.log('SQL Connection has been established successfully.');
        } catch (error) {

        console.error('Unable to connect to the Server:', error);  
    }
})