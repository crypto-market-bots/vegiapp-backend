const express=require("express");
const router=express.Router();

const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrderStatus, deleteOrder, verifyOrder, reviewOrder,newCodOrder } = require("../controllers/orderController");
const { isAuthenticated, authorizedRoles } = require("../middleware/auth");
const { route } = require("./productRoute");

//const { route } = require("./productRoute");

router.route("/order/new").post(isAuthenticated, authorizedRoles("user","delivery"), newOrder);
router.route("/ordercod/new").post(isAuthenticated, authorizedRoles("user","delivery"), newCodOrder);
router.route("/order/verifyOrder").post(isAuthenticated, authorizedRoles("user","delivery"), verifyOrder);
router.route("/orders/me").get(isAuthenticated,authorizedRoles("user","delivery"),myOrders);
router.route("/order/review/:id").post(isAuthenticated,authorizedRoles("user","delivery"),reviewOrder)
router.route("/order/:id").get(isAuthenticated,authorizedRoles("user","delivery"),getSingleOrder);
router.route("/admin/orders").get(isAuthenticated,authorizedRoles("seller"),getAllOrders);
router.route("/admin/order/:id").put(isAuthenticated,authorizedRoles("seller"),updateOrderStatus).delete(isAuthenticated,authorizedRoles("seller"),deleteOrder);


module.exports = router;