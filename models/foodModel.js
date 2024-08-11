const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Product name is required'] 
    },
    foodTags: { 
        type: String
    },
    price: { 
        type: Number, 
        required: [true, 'Product price is required'],
        min: [0, 'Price must be a positive number']
    },
    imgUrl: { 
        type: String, 
        default: 'https://t3.ftcdn.net/jpg/02/41/30/72/360_F_241307210_MjjaJC3SJy2zJZ6B7bKGMRsKQbdwRSze.jpg'
    },
    category: { 
        type: String
    },
    code:{
        type: String
    },
    isAvailable:{
        type: Boolean,
        default: true
    },
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    rating:{
        type: Number,
        min: [1, 'Rating must be between 0 and 5'],
        max: [5]
    },
    ratingCount:{
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },

},{timestamps: true});

const Food = mongoose.model('Food', FoodSchema);
module.exports = Food;
