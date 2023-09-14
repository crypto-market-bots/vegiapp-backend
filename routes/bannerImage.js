const express = require("express");
const { getAllBannerImage, addBannerImage, deleteBannerImage } = require("../controllers/bannerImageController");
const { isAuthenticated, authorizedRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/bannerimage/getall").get(isAuthenticated,authorizedRoles("owner"),getAllBannerImage);
router.route("/bannerimage/add").post(isAuthenticated,authorizedRoles("seller"),addBannerImage);
router.route("/bannerimage/delete").post(isAuthenticated,authorizedRoles("seller"),deleteBannerImage);

module.exports = router;