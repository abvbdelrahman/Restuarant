const Restaurant = require('../models/restaurantModel');
const CatchAsync = require('../utils/CatchAsync');

exports.getAllRestaurants = CatchAsync(async (req, res) => {
    const restaurants = await Restaurant.find({});
    res.status(200).json({ success: true, data: restaurants });
});

exports.getRestaurantById = CatchAsync(async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });
    res.status(200).json({ success: true, data: restaurant });
});

exports.createRestaurant = CatchAsync(async (req, res) => {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json({ success: true, data: restaurant });
});

exports.updateRestaurant = CatchAsync(async (req, res) => {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedRestaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });
    res.status(200).json({ success: true, data: updatedRestaurant });
});

exports.deleteRestaurant = CatchAsync(async (req, res) => {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deletedRestaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });
    res.status(200).json({ success: true, message: 'Restaurant deleted' });
});
