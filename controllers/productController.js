const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
//const { prototype } = require("nodemailer/lib/mime-node");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: "../Config/config.env" });

const cloudinary = require("cloudinary");

// we will upload image on cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_service: process.env.CLOUD_API_SECRET,
});
//Create Product-- only use by Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
 console.log(req.body)
  req.body.seller = req.seller.id;
  //req.body.seller);
  console.log(req.files)
  if (
    !req.files ||
    Object.keys(req.files).length === 0 ||
    Object.keys(req.files).length > 1
  ) {
    return next(new ErrorHander("please upload one image", 400));
  }
  const file = req.files.file;
  if (file.size > 2 * 1024 * 1024) {
    return next(new ErrorHander("Image Size too large", 400));
  }

 if(file.mimetype !=='image/jpeg' && file.mimetype !=='image/png' ){
  return next(new ErrorHander("File format is incorrect.",400))
 }
  try {
    cloudinary.v2.uploader.upload(file.tempFilePath,{folder:"Product Images"},async(err,result) => {
        if(err) return next(new ErrorHander(err,400));
        req.body.public_image_id = result.public_id,
        res.body.image = result.secure_url
    })
  } catch (err) {
    return next(new ErrorHander(err, 500));
  }
  


  
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//for update the data for a particular product --Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {

  let product = Product.find(req.params.id);
  if (!product) {
    return next(new ErrorHander("Product Not Found", 404));
  }
  req.body.last_update_At = Date.now();
  if (req.file) {
    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get(
      "host"
    )}/public/productImages/`;
    req.body.image = `${basePath}${fileName}`;
    console.log("im ",req.body.image);
  }

  //"helo");
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
});

// Delete Product --Admin
exports.deleteProducts = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("Product Not Found", 404));
  }
  await product.remove();

  res.status(200).json({
    success: true,
    message: "Prduct successfully Deleted",
  });
});

//Get all product
exports.getallProduct = catchAsyncError(async (req, res) => {

  const resultPerPage = 5;
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
  req.body.user = req.user.id;
  const product = await Product.find({ user: req.body.user });
  res.status(200).json({
    success: true,
    product,
  });
});

///Upload Image

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}


const storage = multer.diskStorage({
  destination:function(req,file,cb){
  
       const isValid = FILE_TYPE_MAP[file.mimetype];
       let uploadError = new Error('invlalid image type');
      
       if(isValid) {
          uploadError = null
       }

cb(uploadError,path.join(__dirname,'../public/productImges'),function(err,successs){
     if(err){
            throw err;
     }
})
  },
  filename:function(req,file,cb){
     const name = Date.now() + '-' + file.originalname;
     cb(null,name,function(err,success){
            if(err) throw err
     })
  }
})


exports.upload = multer({storage:storage});