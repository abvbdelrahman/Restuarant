const express = require('express');
const { MenuItem, Category, SpecialMenu } = require('../models/menuModel');
const menuController = require('../controllers/menuController');
const router = express.Router();
router
    .route('/')
    .post(menuController.createMenuItems)

router
    .route('/:id')
    .patch(menuController.updateMenuItems)
    .delete(menuController.deletMenuItems);

router.get('category/:categoryId', menuController.getMenuItemsCategory);

// Get special menu items based on date
router.get('/specialMenus',menuController.getSpecialMenus);

module.exports = router;
