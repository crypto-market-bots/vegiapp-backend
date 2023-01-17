const express=require("express");
const router=express.Router();

const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrderStatus, deleteOrder, verifyOrder } = require("../controllers/orderController");
const { isAuthenticated, authorizedRoles } = require("../middleware/auth");
const { route } = require("./productRoute");

//const { route } = require("./productRoute");

router.route("/order/new").post(isAuthenticated, authorizedRoles("user"), newOrder);
router.route("/order/verifyOrder").post(isAuthenticated, authorizedRoles("user"), verifyOrder);
router.route("/orders/me").get(isAuthenticated,authorizedRoles("user","delivery"),myOrders);

router.route("/order/:id").get(isAuthenticated,authorizedRoles("user"),getSingleOrder);
router.route("/admin/orders").get(isAuthenticated,authorizedRoles("admin"),getAllOrders);
router.route("/admin/order/:id").put(isAuthenticated,authorizedRoles("admin"),updateOrderStatus).delete(isAuthenticated,authorizedRoles("admin"),deleteOrder);


module.exports = router;