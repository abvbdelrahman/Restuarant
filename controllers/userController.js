const User = require('../models/userModel');
const CatchAsync = require('../utils/CatchAsync');
const bcrypt = require('bcryptjs');
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
exports.resetPassword = CatchAsync(async (req, res) => {
    const { email, newPassword, answer } = req.body;

    // Check if all fields are provided
    if (!email || !newPassword || !answer) {
        return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }
    // Find the user by email and answer
    const user =await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10); // Generate salt
    const hashedPassword = await bcrypt.hash(newPassword, salt); // Hash the new password

    // Update user's password
    user.password = hashedPassword;
    user.passwordConfirm = undefined
    await user.save({validateBeforeSave: false});

    res.status(200).json({ success: true, message: 'Password reset successfully' });
});
exports.updatePassword = CatchAsync(async (req, res, next) => {
    // Fetch the user by ID and include the password field
    const user = await User.findById(req.user.id).select('+password');
    
    if (!user) {
        return res.status(401).json({ success: false, message: 'User not found' });
    }

    const { currentPassword, newPassword, newPasswordConfirm } = req.body;

    // Compare the provided current password with the stored hashed password
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    // Debugging: Log the result of the password comparison
    console.log('Password match result:', isMatch);

    if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    // Check if the new password and its confirmation match
    if (newPassword !== newPasswordConfirm) {
        return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password and save the changes
    user.password = hashedPassword;
    user.passwordConfirm = undefined; // Remove passwordConfirm to avoid validation issues
    
    await user.save();

    res.status(200).json({ success: true, message: 'Password updated successfully' });
});



exports.deleteUser = CatchAsync(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, message: 'User deleted' });
});
