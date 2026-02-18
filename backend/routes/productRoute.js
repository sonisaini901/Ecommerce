const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { getProducts, getProductDetails } = require('../controllers/productController');

const router = express.Router();

router.route('/products/all').get(getProducts);
router.route('/product/:url').get(getProductDetails);

module.exports = router;