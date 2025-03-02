const { default: slugify } = require('slugify');
const Product =require('../models/Product')


// create
exports.createProduct= async (req,res) => {
    try {
        const {name,description,price,quantity,category}= req.body;
        if(!name || !description || !price || !quantity || !category){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            });
        }

        const product= await Product.create({ 
            name,
            slug:slugify(name),
            description,
            price,
            quantity,
            category
        });

        return res.status(200).send({
            success:true,
            product,
            message: "Product created successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            error,
            message: "Error in creating product"
        })
    }
}

// get products
exports.getAllProducts= async (req,res) => {
    try {
        const products= await Product.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1});

        return res.status(200).send({
            success:true,
            total:products.length,
            message:"all products fetched",
            products
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            error,
            message: "Error in getting all products"
        })
    }
}

exports.getProduct= async (req,res) => {
    try {
        const {slug}=req.params;
        const product= await Product.find({slug}).populate('category').select("-photo");

        return res.status(200).send({
            success:true,
            message:"product fetched",
            product
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            error,
            message: "Error in getting product"
        })
    }
}

// delete
exports.deleteProduct= async (req,res) => {
    try {
        const {id}=req.params;
        const product= await Product.findByIdAndDelete(id);

        return res.status(200).send({
            success:true,
            message:"product deleted successfully"
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            error,
            message: "Error in deleting product"
        })
    }
}


// update
exports.updateProduct= async (req,res) => {
    try {
        const {name,description,price,quantity,category}= req.body;
        const {id}=req.params;

        if(!name || !description || !price || !quantity || !category){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            });
        }

        const product= await Product.findByIdAndUpdate(id,{ 
            name,
            slug:slugify(name),
            description,
            price,
            quantity,
            category
        },{new:true});

        return res.status(200).send({
            success:true,
            product,
            message: "Product updated successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            error,
            message: "Error in updating product"
        })
    }
}