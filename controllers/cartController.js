const Cart = require("../models/cartModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHander = require("../utils/errorhander");
const { getAllProductWithSellerId } = require("./productController");

exports.addItemToCart = catchAsyncError(async (req, res, next) => {
  Cart.findOne({ user: req.user.id }).exec(async (error, cart) => {
    if (error) return next(new ErrorHander(error, 400));
    if (cart) {
      //if the cart is already exits then update the cart quantatiy
      //"hello");
      if (
        req.body.cartItems.productId &&
        req.body.cartItems.quantity &&
        req.body.cartItems.price
      ) {
        const productId = req.body.cartItems.productId;
        const isItemAdded = cart.cartItems.find((c) => c.productId == productId
        );
        let condition, action;
        if (isItemAdded) {
          //isItemAdded);
          if(isItemAdded.quantity + req.body.cartItems.quantity < 1){
            return next(new ErrorHander("No more subraction is aplied on that poroduct", 400));
          }
          condition = { user: req.user.id, "cartItems.product": productId };
          action = {
            $set: {
              "cartItems.$": {
                ...req.body.cartItems,
                quantity: isItemAdded.quantity + req.body.cartItems.quantity,
                last_update_At: Date.now(),
              },
            },
          };
          Cart.findOneAndUpdate(condition, action).exec((error, _cart) => {
            if (error) {
              //"error", error);
              return next(new ErrorHander(error, 400));
            }
            if (_cart) {
              return res.status(200).json({
                success: true,
                cart: _cart,
              });
            }
          });
        } else {
          condition = { user: req.user.id };
          action = {
            $push: {
              cartItems: req.body.cartItems,
            },
          };
          Cart.findOneAndUpdate(condition, action).exec((error, _cart) => {
            if (error) return next(new ErrorHander(error, 400));
            if (_cart) {
              return res.status(200).json({ success: true, cart: _cart });
            }
          });
        }
      } else {
        return next(new ErrorHander("All fields is required"));
      }
    } else {
      //if cart not exists then create a new cart
      //"hello2");
      req.body.user = req.user.id;
      const cart = await Cart.create(req.body);
      res.status(200).json({
        success: true,
        cart,
      });
    }
  });
});

//delete the Product form cart

exports.removeItemFromCart = catchAsyncError(async (req, res, next) => {
  if (req.body.productId) {
    Cart.findOne({ user: req.user.id }).exec(async (error, cart) => {
      if (error) return next(new ErrorHander(error, 400));
      if (cart) {
        //if the cart is already exits then update the cart quantatiy
        //"hello");
        const productId = req.body.productId;
        // const products = cart.cartItems.find();
        const item = cart.cartItems.findIndex((c) => c.productId == productId);
        let condition, action;
        //item);
        if (item >= 0) {
          // //item);
          // condition = { user: req.user.id, "cartItems.product": productId }
          cart.cartItems.splice(item, 1);
          cart.save();
          res.status(200).json({success:true,message:"Successfully deleted"})
        } else {
          return next(new ErrorHander("Not in our Cart", 400));
        }
      } else {
        //if cart not exists then create a new cart
        return next(new ErrorHander("Not in our Cart", 400));
      }
    });
  } else {
    return next(new ErrorHander("Please give the product Id", 400));
  }
 
});


exports.cartAllProduct = catchAsyncError(async (req, res, next) => {
  const carts = await Cart.find({user:req.user.id}).populate({
    path: "cartItems.productId",
  });
  res.status(200).json({
    success: true,
    carts,
  });
});
