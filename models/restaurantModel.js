const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({ 
    title: {
        type: String,
        required: [true,'Restaurant Title is required'],
        unique: true
    },
    imageUrl:
    {
        type: String
    },
    food:{type:Array},
    time:
    {
        type: String
    },
    pickup:{
        type: Boolean,
        default: true
    },
    delivery: {
        type: Boolean,
        default: true
    },
    isOpen:{
        type: Boolean,
        default: true
    },
    logoUrl:{
        type: String
    },
    rating:{
        type: Number,
        default: 1,
        min: [1, 'Rating must be between 1 and 5'],
        max: [5, 'Rating must be between 1 and 5']
    },
    ratingCount:{
        type: String
    },
    code:{
        type: String
    },
    coords:{
        id:{type: String},
        latitude:{type: Number},
        longitude:{type: Number},
        latitudeDelta:{type:Number},
        longitudeDelta:{type:Number},
        address:{type: String},
        title:{type:String}
    }
},{timestamps: true})
const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
module.exports = Restaurant;