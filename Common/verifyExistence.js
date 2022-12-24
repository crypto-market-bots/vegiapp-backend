
const ErrorHander = require("../utils/errorhander");
const Seller = require("../models/sellerModel");
const catchAsyncError = require("../middleware/catchAsyncError");

const User = require("../models/userModel");


exports.verifyExistence = catchAsyncError(async (req, res, next) => {
    const email = req.body.email;
    const phone = req.body.phone;
    
    var seller = null;
    var user = null;
    if (!email && !phone) return next(new ErrorHander(`enter credantials`, 400));
    else if (email && !phone) {
      seller = await Seller.findOne({ email: email });
      user = await User.findOne({ email: email });
    } else if (!email && phone) {
      seller = await Seller.findOne({ phone: phone });
      user = await User.findOne({phone:phone});
    } else {
      seller = await Seller.findOne({
        $or: [{ email: email }, { phone: phone }],
      });
      user = await User.findOne({
        $or: [{ email: email }, { phone: phone }],
      });
    }
  
    if (seller || user) {
      return next(new ErrorHander(`already exists`, 400));
    }
  
    res.status(200).json({
      success: true,
      message: "Does not exists with credianls",
    });
  });

  