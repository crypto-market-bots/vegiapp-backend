const express = require('express');
const { registerSeller, loginSellerEmail,getAllSellers,getAllStores } = require('../controllers/sellerController');

const { isAuthenticated ,authorizedRoles,verifyExistenceUser} = require("../middleware/auth");
const {otpVerification} = require("../middleware/otpVerfications")

const router=express.Router();

router.route('/seller/getSellersList').get(isAuthenticated, authorizedRoles("owner"), getAllSellers);
router.route('/owner/registerseller').post(isAuthenticated, authorizedRoles("owner"), registerSeller); //otpVerification
router.route('/seller/loginSellerEmail').post(loginSellerEmail);
router.route('/seller/getStoresList').get(isAuthenticated,authorizedRoles("seller"), getAllStores)

module.exports = router;