const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
        required: [true, 'Password is required'] 
    },
    passwordConfirm: { 
        type: String, 
        required: [true, 'Password confirmation is required'] 
    },
    role: { 
        type: String,
        enum: ['admin', 'user', 'delivery'], 
        default: 'user' 
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },
    cart: [{
        productId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product' 
        },
        quantity: { 
            type: Number, 
            required: [true, 'Quantity is required'] 
        }
    }]
});

// Hashing password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        // Validate password confirmation
        if (this.password !== this.passwordConfirm) {
            return next(new Error('Passwords do not match'));
        }
        this.password = await bcrypt.hash(this.password, 10);
        this.passwordConfirm = undefined; // Remove passwordConfirm field
    }
    next();
});

// Validate password
userSchema.methods.correctPassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Index for email field
userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);
module.exports = User;
