const express = require('express');
const { isAuthenticatedUser } = require('../middlewares/auth');
const { getAddressDetails, createShippingAddress, updateShipping, getAddressDetailsById, deleteShippingAddress } = require('../controllers/addressController');

const router = express.Router();

router.route('/shipping/:id').get(getAddressDetails);

router.route('/addressdetail/:id').get(getAddressDetailsById);

router.route('/address/add').post(isAuthenticatedUser, createShippingAddress);

router.route('/address/:id').put(isAuthenticatedUser, updateShipping);

router.route('/address/:id').delete(isAuthenticatedUser, deleteShippingAddress);

module.exports = router;