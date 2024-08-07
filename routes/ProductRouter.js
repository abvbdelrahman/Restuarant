const express = require('express');
const productController = require('../controllers/productController');
const authcontroller = require('../controllers/authController');
const router = express.Router();
router.use(authcontroller.protect);
router
    .route('/')
    .get(productController.getAllProducts)
    .post(authcontroller.restrictTo('admin'),productController.createProduct);


router
    .route('/:id')
    .get(productController.getProductById)
    .patch(authcontroller.restrictTo('admin'),productController.updateProduct)
    .delete(authcontroller.restrictTo('admin'),productController.deleteProduct)

module.exports = router;