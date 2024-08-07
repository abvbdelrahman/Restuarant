const User = require('../models/userModel');
const CatchAsync = require('../utils/CatchAsync');

exports.getAllUsers = CatchAsync(async (req, res) => {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
});

exports.getUserById = CatchAsync(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, data: user });
});

exports.createUser = CatchAsync(async (req, res) => {
    // Validate input
    const { name, email, password, passwordConfirm } = req.body;
    if (!name || !email || !password || !passwordConfirm) {
        return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    // Check if passwords match
    if (password !== passwordConfirm) {
        return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    // Create new user
    const newUser = await User.create({
        name,
        email,
        password,
        passwordConfirm,
    });

    res.status(201).json({ success: true, data: newUser });
});

exports.updateUser = CatchAsync(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, data: user });
});

exports.deleteUser = CatchAsync(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, message: 'User deleted' });
});
