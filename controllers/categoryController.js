const Category = require('../models/categoryModel');
const CatchAsync = require('../utils/CatchAsync');

exports.getAllCategories = CatchAsync(async (req, res, next) => {
    const categories = await Category.find({});
    res.status(200).json({ success: true, data: categories });
});

exports.getCategoryById = CatchAsync(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    res.status(200).json({ success: true, data: category });
});

exports.createCategory = CatchAsync(async (req, res, next) => {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json({ success: true, data: category });
});

exports.updateCategory = CatchAsync(async (req, res, next) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    res.status(200).json({ success: true, data: category });
});

exports.deleteCategory = CatchAsync(async (req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    res.status(200).json({ success: true, message: 'Category deleted' });
});
