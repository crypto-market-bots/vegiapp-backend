const express = require('express');
const { getOrdersForDelievery, signleOrderDelivery, pickUpOrder, deliveryOrder } = require('../controllers/delieveryBoyController');

const { isAuthenticated, authorizedRoles } = require('../middleware/auth');
const { otpVerification } = require('../middleware/otpVerfications');
const { route } = require('./favouriteRoute');


const router = express.Router();

router.route("/delivery/allorder").get(isAuthenticated,authorizedRoles('delivery'),getOrdersForDelievery);
router.route("/delivery/singleordr/:id").get(isAuthenticated,authorizedRoles('delivery'),signleOrderDelivery);
router.route("/delivery/pickuporder/:id").get(isAuthenticated,authorizedRoles('delivery'),pickUpOrder)
router.route("/delivery/deliveredorder/:id").get(otpVerification,deliveryOrder)

module.exports = router;
