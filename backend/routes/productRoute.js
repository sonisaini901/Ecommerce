const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { getProducts, getProductDetails, getProductDetailsById } = require('../controllers/productController');

const router = express.Router();

router.route('/products/all').get(getProducts);
router.route('/product/:url').get(getProductDetails);
router.route('/productID/:id').get(getProductDetailsById);

module.exports = router;