const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncError = require("../middleware/catchAsyncError");
const { report } = require("../routes/productRoute");
const Location = require("../models/locationModel");
const Seller = require("../models/sellerModel");
const User = require("../models/userModel");
const Wallet = require("../models/walletModel");
const Razorpay = require("razorpay");
const { v4: uuidv4 } = require("uuid");
const { listenerCount } = require("process");
const Cart = require("../models/cartModel");
// anotherFile.js

const { broadcastMessage } = require('../Common/websocket');
let razorPayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.newOrder = catchAsyncError(async (req, res, next) => {
  console.log(req.body);
  console.log("ulaula");
  const { shippingInfo_id, orderItems, coin } = req.body;
  let wallet = await Wallet.findOne({ user: req.user._id });
  if (!shippingInfo_id || !orderItems) {
    return next(new ErrorHander("All Fields Required", 400));
  }

  const loc = await Location.findById(shippingInfo_id._id);
  if (!loc) return next(new ErrorHander("Location does not exist"));

  var itemsPrice = 0;
  var discount = 0;
  let store_location;
  for (const orderItem of orderItems) {
    const product = await Product.findById(orderItem.productId).select(
      "+seller"
    );
    if (!product)
      return next(new ErrorHander("Some of your product is not exists"));
    if (orderItem.quantity > product.stock)
      return next(
        new ErrorHander(
          `Your quantity of this ${product.name} is more that is  not availble in our stock`
        )
      );

    const seller = await Seller.findById(product.seller);
    console.log(product.seller);
    store_location = seller.store_location;
    orderItem.price = product.real_price * orderItem.quantity;
    orderItem.discount = Math.ceil(
      ((product.real_price * product.discount) / 100) * orderItem.quantity
    );
    product.stock -= orderItem.quantity;

    await product.save({ validateBeforeSave: false });
    itemsPrice += orderItem.price;
    discount += orderItem.discount;
  }

  //Ceil the items value
  itemsPrice = Math.ceil(itemsPrice);

  //firstly check for coins
  if (wallet.amount < coin) {
    return next(new ErrorHander(`Insufficient coins !`));
  }

  //if used coins is === to calculated amount
  //means order is placed with trans is paid
  console.log(itemsPrice, discount, coin);
  let totalPrice = itemsPrice - discount - (coin ? coin : 0); //shipping and tax price functionality pending
  console.log(typeof totalPrice, totalPrice);
  console.log(Date(Date.now()));

  if (coin == itemsPrice - discount) {
    const order = await Order.create({
      shippingInfo_id,
      orderItems,
      itemsPrice,
      discount,
      totalPrice,
      customer: req.user._id,
      store_location: store_location,
      trans_status: "paid",
      createdDate: Date(Date.now()),
      coin: coin,
    });
    wallet.amount = wallet.amount - coin;
    wallet.save();
    broadcastMessage('refresh-orders');
    res.status(200).json({
      success: true,
      message: "order placed successfully",
      order,
    });
  }

  //if if used coins is less === to calculated amount
  //subtract the amount to coins
  //folllow the same procedure

  // taxPrice //shippingPrice

  const uid = uuidv4();
  console.log("uid->>", uid);
  orderRazorpayParams = {
    amount: totalPrice * 100,
    currency: "INR",
    receipt: uid,
    payment_capture: "1",
  };

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
        coin: coin,

        //razorpay
        order_id: response.id,
        receipt_id: response.receipt,
        trans_status: response.status,
        createdDate: Date(Date.now()),
      });
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
exports.newCodOrder = catchAsyncError(async (req, res, next) => {
  console.log(req.body);

  const { shippingInfo_id, orderItems, coin } = req.body;
  let wallet = await Wallet.findOne({ user: req.user._id });
  if (!shippingInfo_id || !orderItems) {
    return next(new ErrorHander("All Fields Required", 400));
  }

  const loc = await Location.findById(shippingInfo_id._id);
  if (!loc) return next(new ErrorHander("Location does not exist"));

  var itemsPrice = 0;
  var discount = 0;
  let store_location;
  let itemsInOrder = [];
  console.log(orderItems);
  console.log('oooooo')
  for (const orderItem of orderItems) {
    const product = await Product.findById(orderItem.productId).select(
      "+seller"
    );
    itemsPrice = itemsPrice + product.real_price * orderItem.quantity;
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
    orderItem.price = product.real_price * orderItem.quantity;
    orderItem.discount = Math.ceil(
      ((product.real_price * product.discount) / 100) * orderItem.quantity
    );
    discount += orderItem.discount;
    product.stock -= orderItem.quantity;

    await product.save({ validateBeforeSave: false });
    orderItem.product = orderItem.productId;
    itemsInOrder.push(orderItem);
  }
  let totalPrice = itemsPrice - discount - (coin ? coin : 0); //shipping and tax price functionality pending
    itemsPrice = Math.ceil(itemsPrice);
    const orderObj = await Order.create({
      shippingInfo_id: shippingInfo_id,
      orderItems: itemsInOrder,
      itemsPrice: itemsPrice,
      discount: discount,
      totalPrice: totalPrice,
      customer: req.user._id,
      store_location: store_location,
      trans_status: "pending",
      createdDate: Date(Date.now()),
      coin: coin,
    })
      .then(async (response) => {
        wallet.amount = wallet.amount - coin;
        wallet.save();
        const orderNew = {
          shippingInfo_id: shippingInfo_id,
          orderItems: itemsInOrder,
          itemsPrice: itemsPrice,
          discount: discount,
          totalPrice: totalPrice,
          customer: req.user._id,
          store_location: store_location,
          trans_status: "pending",
          createdDate: Date(Date.now()),
          coin: coin,
        };
        broadcastMessage('refresh-orders');
        res.status(200).json({
          success: true,
          message: "order placed successfully",
          order: orderNew,
        });
      })
      .catch((err) => {
        console.log(err);
      });
});

exports.verifyOrder = catchAsyncError(async (req, res, next) => {
  const { coin } = req.body;

  body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
  let wallet = await Wallet.findOne({ user: req.user._id });

  let crypto = require("crypto");
  let expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === req.body.razorpay_signature) {
    // now here update the coins  // coins
    // minus
    wallet.amount = wallet.amount - coin;
    await wallet.save();
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
    .populate("orderItems.product")
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
  const orders = await Order.find({ customer: req.user._id }).populate(
    "orderItems.product"
  );

  res.status(200).json({
    success: true,
    orders,
  });
});

//Get all the order -- admin

exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  try {
    // Get the page number and page size from query parameters or set default values
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    // Calculate the number of documents to skip
    const skip = (page - 1) * pageSize;
    console.log(skip);

    // Query the database with pagination
    const orders = await Order.find()
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(pageSize)
      .exec();
    console.log(orders);
    // Calculate the total number of orders (you may need to query the total count separately)
    const totalOrders = await Order.countDocuments();

    // Calculate the total amount for the orders on the current page
    let totalAmount = 0;
    orders.forEach((o) => {
      totalAmount += o.totalPrice;
    });

    // Filter active orders
    const activeOrders = orders.filter(item => item.status === 'pending' || item.status === 'shipped');
    const totalPages = Math.ceil(totalOrders / pageSize);
    res.status(200).json({
      success: true,
      totalAmount,
      totalPages,
      totalOrders,
      orders: orders,
    });
  } catch (error) {
    // Handle the error and send an error response if needed
    res.status(500).json({ success: false, error: 'Internal Server Error' + error });
  }
});



//Update the order Status -- Admin
exports.updateOrderStatus = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order is not find by this id", 404));
  }

  if (order.trans_status === "delivered") {
    return next(new ErrorHander("You have already delivered this order", 400));
  }

  console.log(order);
  if (order.trans_status === "shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }

  order.trans_status = req.body.status;
  order.orderStatus = req.body.status;

  if (req.body.status === "delivered") {
    order.deliveredDate = Date(Date.now());
  }
  await order.save({ validateBeforeSave: false });
  broadcastMessage('refresh-orders');
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
  broadcastMessage('refresh-orders');
  res.status(200).json({
    success: true,
  });
});

//rating and comment functionality handle
exports.reviewOrder = catchAsyncError(async (req, res, next) => {
  const { rating, comment } = req.body;
  if (!rating) return next(new ErrorHander("Rating is mandtory"));
  if (rating > 5) return next(new ErrorHander("rating is not more than 5"));
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order is not find by this id", 404));
  }

  if (order.orderStatus != "delivered") {
    return next(
      new ErrorHander(
        "Order is not delivered . So, you are not able to give the review on our product",
        400
      )
    );
  }

  for (const item of order.orderItems) {
    const productId = item.product;

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: rating,
      comment: comment,
    };

    const product = await Product.findById(productId);

    if (!product) continue; //if product is deleted by owner

    const reviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (reviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
          (rev.rating = rating), (rev.comment = comment);
        }
      });
    } else {
      product.reviews.push(review);

      product.numOfReviews = product.reviews.length;
    }
    let sum = 0;
    product.reviews.forEach((rev) => {
      sum += rev.rating;
    });
    product.rating = sum / product.reviews.length;

    product.save({ validateBeforeSave: false });
  }
  order.rating = rating;
  order.comment = comment;

  order.save();
  res.status(200).json({
    success: true,
    message: "Review update successfull",
  });
});
