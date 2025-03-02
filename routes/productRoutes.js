const express= require("express");

const { createProduct, getAllProducts, getProduct, deleteProduct, updateProduct } = require( "../controllers/productC");
const { isUser,isAdmin } = require( "../middleware/authM");

const router= express.Router();

// routes

// create
router.post('/create-product',isUser,isAdmin,createProduct);

// get all
router.get('/get-all-products',getAllProducts);

// get one
router.get('/get-product/:slug',getProduct);

// delete
router.delete('/delete-product/:id',isUser,isAdmin,deleteProduct);

// update
router.put('/update-product/:id',isUser,isAdmin,updateProduct);

module.exports = router;