const express=require("express");
//const { getSingleProduct } = require("../controllers/productController");
// const { registerUser, loginUserPhone, logout, sendUserPasswordResetEmail, UserPasswordReset, getUserDetails, changeUserPassword  , updateUserProfile, getAllUser, getSingleUser, sendOTP, verifyExistence, loginUserEmail} =  require("../controllers/userController");
const { isAuthenticated ,authorizedRoles} = require("../middleware/auth");
const {otpVerification} = require("../middleware/otpVerfications")
const {sendOTP} = require('../Common/sendOtp');
const { verifyExistence } = require("../Common/verifyExistence");
const {allStore} = require("../Common/allStore");
const { checkValidity } = require("../Common/check_token_validity");
const { avatarUpload, getAllAvatar } = require("../Common/avatarUpload");


const router=express.Router();


router.route('/sendotp').post(sendOTP);
router.route('/verifyExistence').post(verifyExistence)
router.route('/getAllStore').get(allStore)
router.route("/valid-token").get(isAuthenticated,checkValidity);
router.route("/avatarUpload").post(isAuthenticated,authorizedRoles("owner"),avatarUpload);
router.route("/allavatar").get(getAllAvatar);
module.exports = router;