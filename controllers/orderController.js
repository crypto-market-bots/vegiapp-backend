const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncError = require("../middleware/catchAsyncError");
const { report } = require("../routes/productRoute");
const Location = require("../models/locationModel");
const Seller = require("../models/sellerModel");
const User = require("../models/userModel");
const Razorpay = require("razorpay");
const {v4 : uuidv4} = require('uuid')

let razorPayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.newOrder = catchAsyncError(async (req, res, next) => {
  const { shippingInfo_id, orderItems } = req.body;

  if (!shippingInfo_id || !orderItems) {
    return next(new ErrorHander("All Fields Required", 400));
  }

  const loc = await Location.findById(shippingInfo_id);

  if (!loc) return next(new ErrorHander("Location does not exist"));
  var itemsPrice = 0;
  let store_location;
  for (const orderItem of orderItems) {
    const product = await Product.findById(orderItem.product).select("+seller");
    if (!product)
      return next(new ErrorHander("Some of your product is not exists"));
    if (orderItem.quantity > product.stock)
      return next(
        new ErrorHander(
          `Your quantity of this ${product.name} is more that is  not availble in our stock`
        )
      );

    const seller = await Seller.findById(product.seller);
    store_location = seller.store_location;
    orderItem.price =
      (product.real_price - (product.real_price * product.discount) / 100) *
      orderItem.quantity;
    product.stock -= orderItem.quantity;

    await product.save({ validateBeforeSave: false });
    itemsPrice += orderItem.price;
  }
  // taxPrice //shippingPrice

  const totalPrice = itemsPrice;
   const uid = uuidv4();
   console.log("uid->>",uid);
  orderRazorpayParams = {
    amount: totalPrice * 100,
    currency: "INR",
    receipt: uid,
    payment_capture: "1",
  };
  let date_obj = new Date();
  razorPayInstance.orders
    .create(orderRazorpayParams)
    .then(async (response) => {
      const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
      // Save orderId and other payment details
      const order = await Order.create({
        shippingInfo_id,
        orderItems,
        itemsPrice,
        totalPrice,
        customer: req.user._id,
        store_location: store_location,

        //razorpay
        order_id: response.id,
        receipt_id: response.receipt,
        trans_status: response.status,
        createdDate:`${("0" + date_obj.getDate()).slice(-2)}-${("0" + (date_obj.getMonth() + 1)).slice(-2)}-${date_obj.getFullYear()}`,
        createdTime:`${date_obj.getHours()}:${date_obj.getMinutes()}`
      })
      res.status(201).json({
        success: true,
        order,
        razorpayKeyId,
      });
    })
    .catch((err) => {
       console.log(err);
        return next(new ErrorHander("Try Again Something is wrong"));
      
    });
});

exports.verifyOrder = catchAsyncError(async (req, res, next) => {

  body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
  let crypto = require("crypto");
  let expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === req.body.razorpay_signature) {
    await Order.findOneAndUpdate(
      { order_id: req.body.razorpay_order_id },
      {
        payment_id: req.body.razorpay_payment_id,
        signature: req.body.razorpay_signature,
        trans_status: "paid",
      }
    );
    res.status(200).json({
      success: true,
      message: "order placed successfully",
    });
  } else {
    return next(new ErrorHander("Invalid Signature !"));
  }
});

//GET SINGLE order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate("orderItems.product shippingInfo_id")
    .select("-orderItems.product.stock_alert");
  if (!order) {
    return next(new ErrorHander("Order is not find by this id", 404));
  }
  // console.log(order.customer," j");
  // console.log(req.user._id," j");
  const customer = await User.findById(order.customer);
  const loggedUser = await User.findById(req.user._id);
  console.log(customer.email);
  console.log(loggedUser.email);
  if (customer.email === loggedUser.email) {
    res.status(200).json({
      success: true,
      order,
    });
  } else return next(new ErrorHander("This is not your order", 400));
});

//Get all the users for looged users
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//Get all the order -- admin

exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((o) => {
    totalAmount += o.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//Update the order Status -- Admin
exports.updateOrderStatus = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order is not find by this id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHander("You have already delivered this order", 400));
  }

  console.log(order);
  if (order.orderStatus === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  // console.log("hello");
  // console.log(id);
  const product = await Product.findById(id);

  // console.log("cllllllllllllllll");
  product.stock -= quantity;
  // console.log(product.stock);
  await product.save({ validateBeforeSave: false });
}

//delete the order -- Admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order is not find by this id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});
