const express = require('express');
const { addItemToCart, removeItemFromCart, cartAllProduct } = require('../controllers/cartController');

const router = express.Router();

const { isAuthenticated, authorizedRoles } = require("../middleware/auth");
const { route } = require('./productRoute');


router.route('/user/cart/addtocart').post(isAuthenticated,authorizedRoles('user','delivery'),addItemToCart);
router.route('/user/cart/removeitemfromcart').post(isAuthenticated,authorizedRoles('user','delivery'),removeItemFromCart);
router.route('/user/cart/cartAllProduct').get(isAuthenticated,authorizedRoles('user','delivery'),cartAllProduct);
module.exports = router;