const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

router.use(authController.protect);
router.post('/resetPassword', userController.resetPassword);
router.patch('/updatePassword', userController.updatePassword);
router.get('/logout', authController.logout);

// Protected routes

// Admin routes
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
