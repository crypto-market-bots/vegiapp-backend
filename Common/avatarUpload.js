const catchAsyncError = require("../middleware/catchAsyncError");
const AvatarUpload = require("../models/avatarUploadModel");
const ErrorHander = require("../utils/errorhander");
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

exports.avatarUpload = catchAsyncError(async(req,res,next)=>{
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
    catchAsyncError( cloudinary.v2.uploader.upload(
        file.tempFilePath,
        { folder: "avatarImages" },
        async (err, result) => {
          if (err) return next(new ErrorHander(err, 400));
          console.log(result);
          (public = result.public_id), (imageone = result.secure_url);
          removeTmp(file.tempFilePath);
    
          console.log("hello ", imageone);
          req.body.public_image_id = public;
          req.body.image = imageone;
          const avatarUpload = await AvatarUpload.create(req.body).then(()=>{
            console.log("successfully")
            res.status(201).json({
                success: true,
                message:"Image upload successfully"
              });
          }).catch((err)=>{
            return next(new ErrorHander(err,400));
          });
          
        }
      )
      )
})

//get all avatar
exports.getAllAvatar = catchAsyncError(async(req,res,next)=>{
   const AllAvatar = await AvatarUpload.find();
   res.status(200).json({
    success:true,
    AllAvatar
   })
})
const removeTmp = (path) => {
    fs.unlink(path, (err) => {
      if (err) {
        return next(new ErrorHander(err, 400));
      }
    });
  };