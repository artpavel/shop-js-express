const express = require('express');

// out file
const authController = require('../controllers/auth-controller');

// router
const router = express.Router();

router.get('/signup', authController.getSignup);
router.get('/login', authController.getLogin);


module.exports = router;