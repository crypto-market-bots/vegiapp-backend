const express = require('express');
const { registerSeller, loginSellerEmail,getAllSellers } = require('../controllers/sellerController');

const { isAuthenticated ,authorizedRoles,verifyExistenceUser} = require("../middleware/auth");
const {otpVerification} = require("../middleware/otpVerfications")

const router=express.Router();

router.route('/seller/getSellersList').get(isAuthenticated, authorizedRoles("owner"), getAllSellers);
router.route('/owner/registerseller').post(isAuthenticated, authorizedRoles("owner"), registerSeller); //otpVerification
router.route('/seller/loginSellerEmail').post(loginSellerEmail);

module.exports = router;