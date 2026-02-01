const express = require('express');
const coffeController = require('../controllers/coffeController');
const authMiddleware = require('../middlerwares/authMiddleware');

const router = express.Router();

router.route('/create').post(authMiddleware,coffeController.createcoffe);
router.route('/test').post(authMiddleware,coffeController.test);

module.exports = router;