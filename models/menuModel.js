const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    available: { type: Boolean, default: true },
    image: { type: String },
});

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
});

const specialMenuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
    startDate: { type: Date },
    endDate: { type: Date }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
const Category = mongoose.model('Category', categorySchema);
const SpecialMenu = mongoose.model('SpecialMenu', specialMenuSchema);

module.exports = { MenuItem, Category, SpecialMenu };
