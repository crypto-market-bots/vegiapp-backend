const express=require("express");
//const { getSingleProduct } = require("../controllers/productController");
const { registerUser, loginUserPhone, logout, sendUserPasswordResetEmail, UserPasswordReset, getUserDetails, changeUserPassword  , updateUserProfile, getAllUser, getSingleUser, loginUserEmail, addDeliveryAddress} =  require("../controllers/userController");
const { isAuthenticated ,authorizedRoles,verifyExistenceUser} = require("../middleware/auth");
const {otpVerification} = require("../middleware/otpVerfications")

const router=express.Router();

router.route("/user/register").post(otpVerification, registerUser);
router.route("/user/loginEmail").post(loginUserEmail);
router.route("/user/loginPhone").post(otpVerification , loginUserPhone);
router.route("/user/logout").get(logout);
router.route("/user/send-reset-password-email").post(sendUserPasswordResetEmail);
router.route("/user/reset-password/:id/:token").put(UserPasswordReset);
router.route("/user/me").get(isAuthenticated,getUserDetails);
router.route("/user/changedPassword").put( isAuthenticated, changeUserPassword);
router.route("/user/addDeliveryAddress").post( isAuthenticated, authorizedRoles('user'), addDeliveryAddress);

//router.route("/user/Update User profile").put(isAuthenticated,updateUserProfile);

// router.route("/admin/users").get(isAuthenticated,authorizedRoles('admin'),getAllUser);

// router.route("/admin/user/:id").get(isAuthenticated,authorizedRoles('admin'),getSingleUser);



module.exports=router;