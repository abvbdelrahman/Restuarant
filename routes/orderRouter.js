const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');
const router = express.Router();

// Protect all routes
router.use(authController.protect);

// General user routes
router.route('/')
  .get(orderController.getAllOrders)
  .post(orderController.createOrder);

router.route('/:id')
  .get(orderController.getOrderById)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
