const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
//const { prototype } = require("nodemailer/lib/mime-node");
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
//Create Product-- only use by Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  console.log(req);
  req.body.seller = req.seller.id ? req.seller.id : req.seller._id;
 
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

  // if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
  //   removeTmp(file.tempFilePath);

  //   return next(new ErrorHander("File format is incorrect.", 400));
  // }
  catchAsyncError( cloudinary.v2.uploader.upload(
    file.tempFilePath,
    { folder: "ProductImages" },
    async (err, result) => {
      if (err) return next(new ErrorHander(err, 400));
      console.log(result);
      (public = result.public_id), (imageone = result.secure_url);
      removeTmp(file.tempFilePath);

      console.log("hello ", imageone);
      req.body.public_image_id = public;
      req.body.image = imageone;
      const product = await Product.create(req.body).then(()=>{
        console.log("successfully")
      }).catch((err)=>{
        return next(new ErrorHander(err,400));
      });
      res.status(201).json({
        success: true,
        product,
      });
    }
  )
  )
});

//for update the data for a particular product --Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = Product.find(req.params.id);
  if (!product) {
    return next(new ErrorHander("Product Not Found", 404));
  }
  req.body.last_update_At = Date.now();
  if (req.files) {
    const file = req.files.file;
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
      { folder: "ProductImages" },
      async (err, result) => {
        if (err) return next(new ErrorHander(err, 400));
        console.log(result);

        removeTmp(file.tempFilePath);

        // console.log("hello ", imageone);
        req.body.public_image_id = result.public_id;
        req.body.image = result.secure_url;

        // const file = req.files.file;
        // cloudinary.v2.uploader.destroy(req.body.public_image_id,async(err,result)=>{
        // if (err) return next(new ErrorHander(err,400));

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        });
        //"helo");

        res.status(200).json({
          success: true,
          product,
        });
      }
    );
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success:true,
    message:"Product Changed Successfully"
  })
  //"helo");
});

// Delete Product --Admin
exports.deleteProducts = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id).select('+seller');
  if (!product) {
    return next(new ErrorHander("Product Not Found", 404));
  }

  console.log(product.seller);
  console.log(req.seller.id);
  if(product.seller  !=  req.seller.id){
          return next(new ErrorHander("This is not Your Product So, Your are not able to delete this"));
  }
  // User.findById( req.user.id )
  req.body.public_image_id = product.public_image_id;
  cloudinary.v2.uploader.destroy(
    req.body.public_image_id,
    async (err, result) => {
      if (err) return next(new ErrorHander(err, 400));
    }
  );

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Prduct successfully Deleted",
  });
});

//Get all product
exports.getallProduct = catchAsyncError(async (req, res) => {
  const resultPerPage = 100;
  const ApiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await ApiFeature.query;

  res.status(200).json({
    success: true,
    products,
  });
});

//Get single product

exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//Create new  Review or Update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: rating,
    comment: comment,
  };
  //review);
  const product = await Product.findById(productId);

  // if(!product){
  //     return next(new ErrorHander("Product does not exists",400));

  // }

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

  res.status(200).json({
    success: true,
  });
});

//Get all The reviews

exports.getAllReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHander("Product does not exists", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete review

exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHander("Product does not exists", 404));
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let sum = 0;
  reviews.forEach((rev) => {
    sum += rev.rating;
  });
  const rating = sum / product.reviews.length;

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      rating,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

exports.getAllProductWithSellerId = catchAsyncError(async (req, res, next) => {
  req.body.seller = req.seller.id;
  const product = await Product.find({ seller: req.body.seller });
  const resultPerPage = 200;
  const ApiFeature = new ApiFeatures(Product.find({ seller: req.body.seller }), req.query)
  .search()
  .filter()
  .pagination(resultPerPage);
  console.log("ok");
const products = await ApiFeature.query;
  res.status(200).json({
    success: true,
    products,
  });
});

//remove imge from tmp
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      return next(new ErrorHander(err, 400));
    }
  });
};


///Upload Image
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
