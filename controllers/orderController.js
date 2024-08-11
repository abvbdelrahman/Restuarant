const Order = require('../models/orderModel');
const CatchAsync = require('../utils/CatchAsync');

exports.getAllOrders = CatchAsync(async (req, res, next) => {
    const orders = await Order.find({}).populate('customer', 'name email');
    res.status(200).json({
        status: 'success',
        results: orders.length,
        data: {
            orders
        }
    });
});

exports.getOrderById = CatchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) return res.status(404).json({ status: 'fail', message: 'Order not found' });

    res.status(200).json({
        status: 'success',
        data: {
            order
        }
    });
});

exports.createOrder = CatchAsync(async (req, res, next) => {
    req.body.user = req.user.id; // Assuming req.user is set by the protect middleware
    const order = await Order.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            order
        }
    });
});

exports.updateOrder = CatchAsync(async (req, res, next) => {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { 
        new: true, 
        runValidators: true 
    }).populate('user', 'name email');

    if (!order) return res.status(404).json({ status: 'fail', message: 'Order not found' });

    res.status(200).json({
        status: 'success',
        data: {
            order
        }
    });
});

exports.deleteOrder = CatchAsync(async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) return res.status(404).json({ status: 'fail', message: 'Order not found' });

    res.status(204).json({
        status: 'success',
        data: null
    });
});
