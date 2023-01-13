const catchAsyncError = require("../middleware/catchAsyncError");
const dotenv = require("dotenv");
dotenv.config({ path: "../Config/config.env" });
const ErrorHander = require("../utils/errorhander");
const Order = require("../models/orderModel");


exports.getOrdersForDelievery = catchAsyncError(async (req, res, next) => {
    notPickedOrders = await Order.find({deliveryBoy : null , orderStatus: "initiated", 
                    store_location : req.user.current_store_location }).select('shippingInfo_id', 'customer', 'totalPrice', 'id')
    
    res.status(201).json({
        success: true,
        notPickedOrders,
    });
});



exports.pickUpOrder = catchAsyncError(async (req, res, next) => {
    let order = await Order.findById(req.body.orderID)
    if (!order.deliveryBoy){
        return next(new ErrorHander("order is already picked up by some other delivery boy"));
    }
    order.status = 'out-for-delivery'
    order.deliveryBoy = req.user
    order.save()

    res.status(200).json({ 
        success:true, 
        message:"order picked up sucessfully",
    })
});