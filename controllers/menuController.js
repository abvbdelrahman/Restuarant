const express = require('express');
const { MenuItem, Category, SpecialMenu } = require('../models/menuModel');
const CatchAsync = require('../utils/CatchAsync');

// Add a new menu item
exports.createMenuItems = CatchAsync( async (req, res) => {
        const newItem = await MenuItem.create(req.body);
        res.status(201).json({ success: true, data: newItem });
});

// Update a menu item
exports.updateMenuItems =CatchAsync( async (req, res) => {
        const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedItem) return res.status(404).json({ success: false, message: 'Item not found' });
        res.status(200).json({ success: true, data: updatedItem });
});

// Remove a menu item
exports.deletMenuItems =CatchAsync( async (req, res) => {
        const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ success: false, message: 'Item not found' });
        res.status(200).json({ success: true, message: 'Item deleted' });

});

// Get menu items by category
exports.getMenuItemsCategory = CatchAsync( async (req, res) => {
        const items = await MenuItem.find({ category: req.params.categoryId, available: true });
        res.status(200).json({ success: true, data: items });
});

// Get special menu items based on date
exports.getSpecialMenus =CatchAsync( async (req, res) => {
        const today = new Date();
        const specialMenus = await SpecialMenu.find({
            startDate: { $lte: today },
            endDate: { $gte: today }
        }).populate('items');
        res.status(200).json({ success: true, data: specialMenus });
});