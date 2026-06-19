const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { getProducts, getProductDetails, getProductDetailsById, getAllProducts } = require('../controllers/productController');

const router = express.Router();

router.route('/products').get(getProducts);
router.route('/products/all').get(getAllProducts);
router.route('/product/:url').get(getProductDetails);
router.route('/productID/:id').get(getProductDetailsById);

module.exports = router;