const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncError = require("../middleware/catchAsyncError");
const { report } = require("../routes/productRoute");
const Location =  require("../models/locationModel");
const Seller = require("../models/sellerModel");
const User =  require("../models/userModel");

exports.newOrder = catchAsyncError(async (req, res, next) => {

  const { shippingInfo_id, orderItems } = req.body;

  if (!shippingInfo_id || !orderItems ) {
    return next(new ErrorHander("All Fields Required", 400));
  }


  const loc = await Location.findById(shippingInfo_id);
 
  if (!loc) return next(new ErrorHander("Location does not exist"));
  var itemsPrice = 0;
  let store_location;
  for (const orderItem of orderItems) 
  {
    const product = await Product.findById(orderItem.product).select("+seller");
    if (!product)
      return next(new ErrorHander("Some of your product is not exists"));
    if (orderItem.quantity > product.stock)
      return next(
        new ErrorHander(
          `Your quantity of this ${product.name} is more that is  not availble in our stock`
        )
      );
      console.log("the ",product.seller);
      const seller= await Seller.findById(product.seller);
      console.log("the ",seller.store_location);
    store_location = seller.store_location;
    orderItem.price =
      (product.real_price - (product.real_price * product.discount) / 100) * orderItem.quantity;
    product.stock -= orderItem.quantity;

    await product.save({ validateBeforeSave: false });
    itemsPrice += orderItem.price;
   
  }
  // taxPrice //shippingPrice
 const totalPrice = itemsPrice;
  const order = await Order.create({
    shippingInfo_id,
    orderItems,
    itemsPrice,
    totalPrice,
    customer: req.user._id,
    store_location: store_location,
  }).then(async(t)=>{
    // console.log(t)
    res.status(201).json({
      success: true,
      orderDetail:t,
    });
  }).catch((err)=>{
    return next(new ErrorHander(err,400));
  });
  console.log(order);
  res.status(201).json({
    success: true,
    order,
  });
});



//GET SINGLE order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {

  const order = await Order.findById(req.params.id).populate(
    "orderItems.product shippingInfo_id"
  ).select('-orderItems.product.stock_alert')
  if (!order) {
    return next(new ErrorHander("Order is not find by this id", 404));
  }
  // console.log(order.customer," j");
  // console.log(req.user._id," j");
  const customer = await User.findById(order.customer);
  const loggedUser =  await User.findById(req.user._id);
  console.log(customer.email  );
  console.log(loggedUser.email);
  if(customer.email === loggedUser.email){
    res.status(200).json({
      success: true,
      order,
    });
  }
  else return next(new ErrorHander("This is not your order",400));
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
