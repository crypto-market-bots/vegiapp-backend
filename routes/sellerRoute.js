const express = require('express');
const { registerSeller, loginSellerEmail } = require('../controllers/sellerController');

const { isAuthenticated ,authorizedRoles,verifyExistenceUser} = require("../middleware/auth");
const {otpVerification} = require("../middleware/otpVerfications")

const router=express.Router();


router.route('/owner/registerseller').post(isAuthenticated, authorizedRoles("owner"), registerSeller); //otpVerification
router.route('/seller/loginSellerEmail').post(loginSellerEmail);

module.exports = router;