const express = require('express');

// out file
const authController = require('../controllers/auth-controller');

// router
const router = express.Router();

// signup
router.get('/signup', authController.getSignup);
router.post('/signup', authController.signup);

// login
router.get('/login', authController.getLogin);
router.post('/login', authController.login);

// logout
router.post('/logout', authController.logout);

module.exports = router;