const express = require('express');
const { getOrdersForDelievery, signleOrderDelivery, pickUpOrder } = require('../controllers/delieveryBoyController');

const { isAuthenticated, authorizedRoles } = require('../middleware/auth');
const { route } = require('./favouriteRoute');


const router = express.Router();

router.route("/delivery/allorder").get(isAuthenticated,authorizedRoles('delivery'),getOrdersForDelievery);
router.route("/delivery/singleordr/:id").get(isAuthenticated,authorizedRoles('delivery'),signleOrderDelivery);
router.route("/delivery/pickuporder/:id").get(isAuthenticated,authorizedRoles('delivery'),pickUpOrder)


module.exports = router;
