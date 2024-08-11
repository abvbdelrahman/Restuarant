const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator'); // For email validation

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required'] 
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'], 
        unique: true,
        validate: [validator.isEmail, 'Invalid email address']
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false  // Exclude password from query results by default
    },
    passwordConfirm: { 
        type: String, 
        validate: {
            validator: function(v) {
                // This only works on CREATE and SAVE!!!
                return v === this.password;
            },
            message: 'Passwords do not match'
        }
    },
    address: {
        type: Array
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    role: { 
        type: String,
        enum: ['admin', 'driver', 'vendor', 'client'], 
        default: 'client' 
    },
    profile: {
        type: String,
        default: 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='
    },
}, { timestamps: true });

// Hashing password before saving
userSchema.pre('save', async function(next) {
    // Only run this function if the password is modified or new
    if (!this.isModified('password')) return next();

    // Hash the password with cost factor 10
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    // Clear the passwordConfirm field
    this.passwordConfirm = undefined;
    
    next();
});

// Method to validate password
userSchema.methods.correctPassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Index for email field to optimize queries
userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);
module.exports = User;
