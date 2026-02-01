const express = require('express');
const cardController = require('../controllers/cardController');
const authMiddleware = require('../middlerwares/authMiddleware');

const router = express.Router();

router.route('/create').post(authMiddleware,cardController.createCard);
router.route('/getCard').get(authMiddleware,cardController.getCard);
router.route('/test').post(authMiddleware,cardController.test);

module.exports = router;