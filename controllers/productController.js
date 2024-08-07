const Product = require('../models/productModel');
const CatchAsync = require('../utils/CatchAsync');

exports.getAllProducts = CatchAsync(async (req, res, next) => {
    // Implement pagination and filtering
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    
    const products = await Product.find({}).skip(skip).limit(limit);

    res.status(200).json({
        status: 'success',
        results: products.length,
        data: {
            products
        }
    });
});

exports.getProductById = CatchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
        return res.status(404).json({
            status: 'fail',
            message: 'Product not found'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    });
});

exports.createProduct = CatchAsync(async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            product
        }
    });
});

exports.updateProduct = CatchAsync(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { 
        new: true, 
        runValidators: true 
    });

    if (!product) {
        return res.status(404).json({
            status: 'fail',
            message: 'Product not found'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    });
});

exports.deleteProduct = CatchAsync(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        return res.status(404).json({
            status: 'fail',
            message: 'Product not found'
        });
    }

    res.status(204).json({
        status: 'success',
        message: 'Product deleted successfully'
    });
});
