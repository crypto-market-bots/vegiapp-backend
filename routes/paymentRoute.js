const express=require("express");
const { isAuthenticated ,authorizedRoles} = require("../middleware/auth");
const {createOrder, verifyOrder} = require("../controllers/paymentController");

router.route("createOrder").post(isAuthenticated, authorizedRoles("user"), createOrder);
router.route("verifyOrder").post(isAuthenticated, authorizedRoles("user"), verifyOrder);

module.exports = router;