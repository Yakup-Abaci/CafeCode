const express = require('express');
const authController = require('../controllers/authController');
const coffeController = require('../controllers/coffeController');
const authMiddleware = require('../middlerwares/authMiddleware');

const router = express.Router();

router.route('/signup').post(authController.createUser);
router.route('/login').post(authController.loginUser);
router.route('/test').post(authMiddleware,authController.test);
router.route('/coffeSignup').post(coffeController.createCoffe);
router.route('/coffeLogin').post(coffeController.loginCoffe);
router.route('/coffeTest').post(authMiddleware,coffeController.test);
module.exports = router;