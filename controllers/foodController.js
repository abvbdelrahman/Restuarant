const Food = require('../models/foodModel');
const CatchAsync = require('../utils/CatchAsync');

exports.getAllFoods = CatchAsync(async (req, res, next) => {
    // Implement pagination and filtering
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    
    const foods = await Food.find({}).skip(skip).limit(limit);

    res.status(200).json({
        status: 'success',
        results: foods.length,
        data: {
            foods
        }
    });
});

exports.getFoodById = CatchAsync(async (req, res, next) => {
    const food = await Food.findById(req.params.id);
    
    if (!food) {
        return res.status(404).json({
            status: 'fail',
            message: 'Food not found'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            food
        }
    });
});

exports.createFood = CatchAsync(async (req, res, next) => {
    const food = await Food.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            food
        }
    });
});

exports.updateFood = CatchAsync(async (req, res, next) => {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, { 
        new: true, 
        runValidators: true 
    });

    if (!food) {
        return res.status(404).json({
            status: 'fail',
            message: 'Food not found'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            food
        }
    });
});

exports.deleteFood = CatchAsync(async (req, res, next) => {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
        return res.status(404).json({
            status: 'fail',
            message: 'Food not found'
        });
    }

    res.status(204).json({
        status: 'success',
        message: 'Food deleted successfully'
    });
});
