const catchAsyncError = require("../middleware/catchAsyncError");
const Category = require("../models/categoriesModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");

const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: "../Config/config.env" });
const fs = require("fs");
const cloudinary = require("cloudinary");

// we will upload image on cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.createCategory = catchAsyncError(async (req, res, next) => {
  console.log("ok");
  req.body.seller_id = req.seller.id;
  let public;
  let imageone;
  if (
    !req.files ||
    Object.keys(req.files).length === 0 ||
    Object.keys(req.files).length > 1
  ) {
    return next(new ErrorHander("please upload one image", 400));
  }
  const file = req.files.file;
  if (file.size > 2 * 1024 * 1024) {
    removeTmp(file.tempFilePath);
    return next(new ErrorHander("Image Size too large", 400));
  }

  if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
    removeTmp(file.tempFilePath);

    return next(new ErrorHander("File format is incorrect.", 400));
  }

  cloudinary.v2.uploader.upload(
    file.tempFilePath,
    { folder: "CategoryImages" },
    async (err, result) => {
      if (err) return next(new ErrorHander(err, 400));
      console.log(result);
      (public = result.public_id), (imageone = result.secure_url);
      removeTmp(file.tempFilePath);

      console.log("hello ", imageone);
      req.body.public_image_id = public;
      req.body.image = imageone;

      const category = await Category.create(req.body).then(()=>{
        console.log("successfully")
      }).catch((err)=>{
        return next(new ErrorHander(err,400));
      });
      res.status(200).json({
        success: true,
        category,
      });
    }
  );
});



exports.updateCategory = catchAsyncError(async (req, res, next) => {
  
  console.log(req.body);
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
  if (req.files) {
    const file = req.files.file;
    console.log("file: ->",file);
    if (file.size > 2 * 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return next(new ErrorHander("Image Size too large", 400));
    }

    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTmp(file.tempFilePath);

      return next(new ErrorHander("File format is incorrect.", 400));
    }
    if (!req.body.public_image_id) {
      return next(
        new ErrorHander("public image id of previous image is required", 400)
      );
    }
    cloudinary.v2.uploader.destroy(
      req.body.public_image_id,
      async (err, result) => {
        if (err) return next(new ErrorHander(err, 400));
      }
    );

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "CategoryImages" },
      async (err, result) => {
        if (err) return next(new ErrorHander(err, 400));
        console.log(result);

        removeTmp(file.tempFilePath);

        // console.log("hello ", imageone);
        req.body.public_image_id = result.public_id;
        req.body.image = result.secure_url;
        console.log(req.body.image);
        const category = await Category.findByIdAndUpdate(req.params.id, {
      $set: { image: req.body.image ,public_image_id:req.body.public_image_id},
    });
  })
  }
  console.log(req.body.productsId);
  if (req.body.productsId) {
    console.log("helo p");

    action = {
      $push: {
        productsId: req.body.productsId,
      },
    };
    Category.findById(req.params.id).exec( async(error,category) => {
     if(error) return next(new ErrorHander(error,400));
    const isProductAdded =  category.productsId.find((p)=>p == req.body.productsId
      )
      console.log("isProductAdded",isProductAdded);
      if(!isProductAdded)
      {
        console.log("not in out ctegory");
        Category.findByIdAndUpdate(req.params.id, action).exec(async(error,res)=>{
          if(error) return next(new ErrorHander(error,400));
          else {
            res.status(200).json({
              success: true,
            });
          }
        });
      }
    })
  }
  res.status(200).json({
    success: true,
  });
});

exports.getAllCategory = catchAsyncError(async (req, res, next) => {
  try {
    let category = await Category.find();
    console.log('ulululull');
    for (const element of category) {
      if(req.user && req.user.role=='user'){
        const products = await Product.find({ product_type: element._id,product_location:req.user.current_store_location });
        console.log(products)
        console.log(element)
        console.log(req.user.current_store_location)
        element.productsId = element.productsId.concat(products.map(product => product._id));
      } else{
        const products = await Product.find({ product_type: element._id });
        element.productsId = element.productsId.concat(products.map(product => product._id));
      }
    }
    console.log(category);

    res.status(200).json({
      success: true,
      category: category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});


exports.getSingleCategory = catchAsyncError(async (req, res, next) => {
  const category = await Category.findById(req.params.id).populate({
    path: "productsId",
  });
  if(req.user && req.user.role=='user'){
    const products = await Product.find({ product_type: category._id,product_location:req.user.current_store_location });
    category.productsId = products;
  } else{
    const products = await Product.find({ product_type: category._id });
    category.productsId = products;
  }

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
            res.status(200).json({ success: true, category });
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



//remove from tmp
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      return next(new ErrorHander(err, 400));
    }
  });
};




//Upload Image

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invlalid image type");

    if (isValid) {
      uploadError = null;
    }

    cb(
      uploadError,
      path.join(__dirname, "../public/productImges"),
      function (err, successs) {
        if (err) {
          throw err;
        }
      }
    );
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name, function (err, success) {
      if (err) throw err;
    });
  },
});

exports.upload = multer({ storage: storage });