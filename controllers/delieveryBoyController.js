const catchAsyncError = require("../middleware/catchAsyncError");
const dotenv = require("dotenv");
dotenv.config({ path: "../Config/config.env" });
const ErrorHander = require("../utils/errorhander");
const Order = require("../models/orderModel");


exports.getOrdersForDelievery = catchAsyncError(async (req, res, next) => {
    notPickedOrders = await Order.find({deliveryBoy : null , orderStatus: "initiated", trans_status:"paid",
                    store_location : req.user.current_store_location }).populate("orderItems.product shippingInfo_id")
    
    res.status(201).json({
        success: true,
        notPickedOrders,
    });
});

//single order

exports.signleOrderDelivery = catchAsyncError( async(req,res,next) => {
    const order = await Order.findById(req.params.id)
    .populate("orderItems.product shippingInfo_id")
    if (!order) {
        return next(new ErrorHander("Order is not find by this id", 404));
      }
    res.status(200).json({
        success: true,
        order,
      });
})

exports.pickUpOrder = catchAsyncError(async (req, res, next) => {
    let order = await Order.findById(req.params.id)
    if (!order) {
        return next(new ErrorHander("Order is not find by this id", 404));
      }
    if (order.deliveryBoy){
        return next(new ErrorHander("order is already picked up by some other delivery boy"));
    }
    order.orderStatus = 'out-for-delivery'
    order.deliveryBoy = req.user
    order.save()

    res.status(200).json({ 
        success:true, 
        message:"order picked up sucessfully",
    })
});



exports.deliveryOrder = catchAsyncError(async(req,res,next)=>{
    let order = await Order.findById(req.params.id)
    if (!order) {
        return next(new ErrorHander("Order is not find by this id", 404));
      }
      let date_obj = new Date();
      order.orderStatus = 'delivered'
      order.deliveredDate = `${("0" + date_obj.getDate()).slice(-2)}-${("0" + (date_obj.getMonth() + 1)).slice(-2)}-${date_obj.getFullYear()}`,
      order.deliveredTime = `${date_obj.getHours()}:${date_obj.getMinutes()}`
      order.save()

    res.status(200).json({ 
        success:true, 
        message:"order delivered sucessfully",
    })

})




exports.pickOrders = catchAsyncError(async(req,res,next)=>{
   const PickedOrders = await Order.find({deliveryBoy : req.user._id , orderStatus: "out-for-delivery", trans_status:"paid"}).populate("orderItems.product shippingInfo_id");
    res.status(200).json({
        success:true,
        PickedOrders
    })
})