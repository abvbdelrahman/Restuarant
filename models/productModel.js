const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Product name is required'] 
    },
    price: { 
        type: Number, 
        required: [true, 'Product price is required'],
        min: [0, 'Price must be a positive number']
    },
    category: { 
        type: String, 
        required: [true, 'Product category is required'] 
    },
    image: { 
        type: String, 
        required: [true, 'Product image URL is required'] 
    },
    description: { 
        type: String, 
        required: [true, 'Product description is required'],
        maxlength: [500, 'Description cannot exceed 500 characters']
    }
});

// Index for category field
ProductSchema.index({ category: 1 });

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
