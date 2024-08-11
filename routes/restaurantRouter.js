const express = require('express');
const restaurantController = require('../controllers/restaurantController');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .route('/')
  .get(restaurantController.getAllRestaurants)
  .post(authController.protect,restaurantController.createRestaurant);

router
  .route('/:id')
  .get(restaurantController.getRestaurantById)
  .patch(restaurantController.updateRestaurant)
  .delete(authController.protect,restaurantController.deleteRestaurant);

module.exports = router;
