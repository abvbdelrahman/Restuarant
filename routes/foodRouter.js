const express = require('express');
const foodController = require('../controllers/foodController');
const authcontroller = require('../controllers/authController');
const router = express.Router();
router.use(authcontroller.protect);
router
    .route('/')
    .get(foodController.getAllFoods)
    .post(authcontroller.restrictTo('admin'),foodController.createFood);


router
    .route('/:id')
    .get(foodController.getFoodById)
    .patch(authcontroller.protect,authcontroller.restrictTo('admin'),foodController.updateFood)
    .delete(authcontroller.protect,authcontroller.restrictTo('admin'),foodController.deleteFood)

module.exports = router;