const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    foods: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Food',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Quantity must be at least 1']
            },
            price: {
                type: Number,
                required: true,
                min: [0, 'Price must be a positive number']
            },
        },
    ],
    total: {
        type: Number,
        required: true,
        min: [0, 'Total must be a positive number']
    },
    status: {
        type: String,
        enum: ['Preparing', 'Prepare', 'On the way','deliverd'],
        default: 'Preparing'
    },
    deliveryAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Card', 'Online'],
        default: 'Cash'
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    deliveryDate: Date,
    deliveryTime: String,
    deliveryNote: String
},{timestamps: true});

// Pre-save hook to calculate total price
orderSchema.pre('save', function(next) {
    if (this.isModified('foods')) {
        this.total = this.foods.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    }
    next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
