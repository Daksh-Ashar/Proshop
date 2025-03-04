import dotenv from 'dotenv';
dotenv.config();
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";


// @desc Fetch all Products
// route GET /api/products
//access Public
const getProducts  = asyncHandler(async (req,res)=>{
    const pageSize = process.env.PAGESIZE;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {name : {$regex : req.query.keyword, $options: "i"}} : {};
    const count = await Product.countDocuments({...keyword});
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1));
    res.json({products, page, pages: Math.ceil(count/pageSize)});
});

// @desc Fetch a Product 
// route GET /api/products/:id
//access Public
const getProductById = asyncHandler(async (req,res)=>{
    const product = await Product.findById(req.params.id);
    if(product)
    {
        res.json(product)
    }else{
        res.status(404);
        throw new Error('Resource not found');
    }
    
});

// @desc create Product
// route POST /api/products
//access Private/Admin
const createProduct  = asyncHandler(async (req,res)=>{
    const product = new Product({
        name: "Sample name",
        price: 0,
        user: req.user._id,
        brand:"Sample",
        image: '/images/sample.jpg',
        category:"Sample Category",
        countInStock: 0,
        numReviews:0,
        description: "Sample Description"
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc Update a Product 
// route PUT /api/products/:id
//access Private/Admin
const updateProduct = asyncHandler(async (req,res)=>{
   const {name,price,description,image,brand,category,countInStock} = req.body; 
   const product = await Product.findById(req.params.id);
   if(product)
    {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updateProduct = await product.save();
        res.json(updateProduct);
    }else{
        res.status(404);
        throw new Error("Resource not Found");
    }
});

// @desc Delete a Product 
// route Delete /api/products/:id
//access Private/Admin
const deleteProduct = asyncHandler(async (req,res)=>{
    const product = await Product.findById(req.params.id);
    if(product)
     {
        await Product.deleteOne({_id:product._id});
        res.status(200).json({"message":"product deleted Successfully"})
     }else{
         res.status(404);
         throw new Error("Resource not Found");
     }
 });

 // @desc Create product review 
// route POST /api/products/:id
//access Private
const createProductReview = asyncHandler(async (req,res)=>{
    const {rating, comment} = req.body;
    const product = await Product.findById(req.params.id);
    if(product)
     {
       const alreadyReviewed = product.reviews.find(
        (review)=> {
           return review.user.toString() == req.user._id.toString();
        }
       );
       
       if(alreadyReviewed)
        {
            res.status(400);
            throw new Error("Produt is already reviewed");
        }

        const review = {
            name:  req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc,review)=> acc + review.rating, 0)/product.reviews.length;
        await product.save();
        res.status(201).json({message:'Review added'});
     }else{
         res.status(404);
         throw new Error("Resource not Found");
     }
 });

 // @desc get Top rated Product 
// route GET /api/products/top
//access Public
const getTopProducts = asyncHandler(async (req,res)=>{
    const product = await Product.find({}).sort({rating:-1}).limit(3);
    if(product)
    {
        res.status(200).json(product)
    }else{
        res.status(404);
        throw new Error('No Products present');
    }
    
});

export {getProducts,getProductById,createProduct,updateProduct,deleteProduct,createProductReview,getTopProducts};
