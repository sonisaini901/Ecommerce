const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const SearchFeatures = require('../utils/searchFeatures');
const cloudinary = require('cloudinary');

// Get All Products ---Product Sliders
exports.getProducts = asyncErrorHandler(async (req, res, next) => {
    //const products = await Product.find();

    const searchFeature = new SearchFeatures(Product.find(), req.query)
        .search()
        .filter();

    let products = await searchFeature.query;

    products = await searchFeature.query.clone();

    res.status(200).json({
        success: true,
        products,
    });
});

// Get Product Details
exports.getProductDetails = asyncErrorHandler(async (req, res, next) => {

    const product = await Product.findOne({ url: req.params.url });

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});

// Get Product Details By Id
exports.getProductDetailsById = asyncErrorHandler(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});