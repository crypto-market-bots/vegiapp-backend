const catchAsyncError = require("../middleware/catchAsyncError");
const Favourite = require("../models/favouriteModel");
const ErrorHander = require("../utils/errorhander");

exports.addItemToFavourite = catchAsyncError(async (req, res, next) => {
  Favourite.findOne({ user: req.user.id }).exec(async (error, favourite) => {
    if (error){
  // console.log("in ")
      return next(new ErrorHander(error, 400));
    } 
    if (favourite) {
      //if the cart is already exits then update the cart quantatiy
      //"hello");
      if (req.body.productId) {
        condition = { user: req.user.id };
        action = {
          $push: {
            productsId: req.body.productId,
          },
        };
        Favourite.findOneAndUpdate(condition, action).exec(  
          (error, favourite) => {
            if (error) return next(new ErrorHander(error, 400));
            if (favourite) {
              return res
                .status(200)
                .json({ success: true, favourite: favourite });
            }
          }
        );
      } else {
        return next(new ErrorHander("All fields is required",400));
      }
    } else {
      //if cart not exists then create a new cart
      //"hello2");
      req.body.user = req.user.id;
      const fvourite = await Favourite.create(req.body);
      res.status(200).json({
        success: true,
        fvourite,
      });
    }
  });
});


exports.removeItemFromFavourite = catchAsyncError(async (req, res, next) => {
    if (req.body.productId) {
        Favourite.findOne({ user: req.user.id }).exec(async (error, favourite) => {
        if (error) return next(new ErrorHander(error, 400));
        if (favourite) {
          //if the cart is already exits then update the cart quantatiy
          //"hello");
          const productId = req.body.productId;
          // const products = cart.cartItems.find();
          const item =  await favourite.productsId.findIndex((c) => c == productId);
          let condition, action;
          //item);
          console.log(item);
          if (item >= 0) {
            // //item);
            // condition = { user: req.user.id, "cartItems.product": productId }
            favourite.productsId.splice(item, 1);
            console.log("in remove fvourite")
           
            favourite.save();
            res.status(200).json({
                success:true,
                favourite
            })
          } 
          else {
            console.log("else")
            return next(new ErrorHander("Not in our Favourite", 400));
          }

        } else {
          //if cart not exists then create a new cart
          return next(new ErrorHander("database error", 400));
        }
      });
    } else {
      return next(new ErrorHander("Please give the product Id", 400));
    }
    // res.status(200).json({
    //   success:true
    // })
  });


  exports.getAllFavourite = catchAsyncError(async (req, res, next) => {
    const favourite = await Favourite.find({user:req.user.id});
    res.status(200).json({
      success: true,
      favourite: favourite,
    });
  });
  

 