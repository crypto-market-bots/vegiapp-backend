
const catchAsyncError = require("../middleware/catchAsyncError");
const Category = require("../models/categoriesModel");
const ErrorHander = require("../utils/errorhander");

exports.createCategory = catchAsyncError(async (req, res, next) => {
  //"hello");
  req.body.seller_id = req.seller.id;
  //req.body.productsId);
  const file = req.file;
  if (!file) {
    return next(new ErrorHander("Please upload atleast one image", 400));
  }

  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/productImges/`;
  req.body.image = `${basePath}${fileName}`;
  const category = await Category.create(req.body);
  res.status(200).json({
    success: true,
    category,
  });
});

exports.updateCategory = catchAsyncError(async (req, res, next) => {
  console.log(req.params.id);
  let category = await Category.findById(req.params.id);
  console.log(category);
  if (!category) {
    return next(
      new ErrorHander(
        "Category Does not exists please create the category first",
        400
      )
    );
  }
  if (req.body.name) {
    console.log("helo n");
    const category = await Category.findByIdAndUpdate(req.params.id, {
      $set: { name: req.body.name },
    });
  }
  if (req.file) {
    console.log("helo f");
    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get(
      "host"
    )}/public/productImges/`;
    req.body.image = `${basePath}${fileName}`;

    const category = await Category.findByIdAndUpdate(req.params.id, {
      $set: { image: req.body.image },
    });
  }
  console.log(req.body.productsId);
  if (req.body.productsId) {
    console.log("helo p");

    action = {
      $push: {
        productsId: req.body.productsId,
      },
    };
    const v = await Category.findOneAndUpdate(req.params.id, action);
  }
  res.status(200).json({
    success: true,
  });
});

exports.getAllCategory = catchAsyncError(async (req, res, next) => {
  const category = await Category.find();
  res.status(200).json({
    success: true,
    category: category,
  });
});

exports.getSingleCategory = catchAsyncError(async (req, res, next) => {
  const category = await Category.findById(req.params.id).populate({
    path: "productsId",
  });

  res.status(200).json({ success: true, category });
});

exports.deleteCategory = catchAsyncError(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new ErrorHander("Category Does't Exists", 400));
  }
  await category.remove();

  res.status(200).json({
    success: true,
    message: "Deleted Successfully",
  });
});

exports.removeProductFromCategory = catchAsyncError(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new ErrorHander("Category Does't Exists", 400));
  } else {
    if (req.body.productId) {
      Category.findById(req.params.id).exec(async (error, category) => {
        if (error) return next(new ErrorHander(error, 400));
        if (category) {
          //if the cart is already exits then update the cart quantatiy
          //"hello");
          const productId = req.body.productId;

          // const products = cart.cartItems.find();
          const item = category.productsId.findIndex((c) => c == productId);
          let condition, action;
          //item);
          if (item >= 0) {
            // //item);
            // condition = { user: req.user.id, "cartItems.product": productId }
            category.productsId.splice(item, 1);
            category.save();
            res.status(200).json({success:true,
            category})
          } else {
            return next(new ErrorHander("product not in our category", 400));
          }
        }
      });
    } else {
      return next(new ErrorHander("Please give the product Id", 400));
    }
  }
});
