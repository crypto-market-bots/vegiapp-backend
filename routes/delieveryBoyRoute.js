const express = require('express');
const { getOrdersForDelievery, signleOrderDelivery, pickUpOrder, deliveryOrder, pickOrders } = require('../controllers/delieveryBoyController');

const { isAuthenticated, authorizedRoles } = require('../middleware/auth');
const { otpVerification } = require('../middleware/otpVerfications');
const { route } = require('./favouriteRoute');


const router = express.Router();

router.route("/delivery/allorder").get(isAuthenticated,authorizedRoles('delivery'),getOrdersForDelievery);
router.route("/delivery/singleordr/:id").get(isAuthenticated,authorizedRoles('delivery'),signleOrderDelivery);
router.route("/delivery/pickuporder/:id").get(isAuthenticated,authorizedRoles('delivery'),pickUpOrder)
router.route("/delivery/deliveredorder/:id").post(isAuthenticated,otpVerification,authorizedRoles('delivery'),deliveryOrder)
router.route("/delivery/pickedorders").get(isAuthenticated,authorizedRoles("delivery"),pickOrders);

module.exports = router;
