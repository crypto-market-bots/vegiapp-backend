const catchAsyncError = require("../middleware/catchAsyncError");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: "../Config/config.env" });
const fs = require("fs");
const cloudinary = require("cloudinary");
const bannerImage = require("../models/bannerImage");
const ErrorHander = require("../utils/errorhander");
const Seller = require("../models/sellerModel");
const baanerImage = require("../models/bannerImage")
exports.addBannerImage = catchAsyncError(async(req,res,next)=>{
  
    req.body.seller = req.seller.id;
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
      const seller = await Seller.findById(req.seller.id);
     if(!seller) return next( new ErrorHander("Seller does not exits",400));

      cloudinary.v2.uploader.upload(
        file.tempFilePath,
        { folder: "BannerImages" },
        async (err, result) => {
          if (err) return next(new ErrorHander(err, 400));
          console.log(result);
          (public = result.public_id), (imageone = result.secure_url);
          removeTmp(file.tempFilePath);
    
          console.log("hello ", imageone);
          req.body.public_image_id = public;
          req.body.image = imageone;
          console.log(seller)
          req.body.store_location = seller.store_location;
          
          const bannerImage = await baanerImage.create(req.body).then(()=>{
            console.log("successfully")
          }).catch((err)=>{
            return next(new ErrorHander(err,400));
          });
          console.log("in sellelr loc.",seller.store_location)
          res.status(200).json({
            success: true,
            bannerImag:bannerImage,
          });
        }
      );

})



exports.deleteBannerImage = catchAsyncError(async(req,res,next)=>{
  if(!req.body.public_image_id) return next(new ErrorHander("public_image_id missing",400))
  const baanerImag = await bannerImage.find({seller:req.seller._id,public_image_id:req.body.public_image_id});
  if(!baanerImage) return next(new ErrorHander("This is not your Banner Image",400));
  cloudinary.v2.uploader.destroy(
    req.body.public_image_id,
    async (err, result) => {
      if (err) return next(new ErrorHander(err, 400));
    }
  );
  console.log(
    baanerImag
  )
  await baanerImag[0].remove();
//  const result =  baanerImag({_id:req.body.public_image_id})
 

  res.status(200).json({
    success:true,
    message:"Successfully deleted",
   
  })

})


exports.getAllBannerImage = catchAsyncError(async(req,res,next)=>{
  if(req.seller){
    console.log("req seller",req.seller);
    

     
    const image = await bannerImage.find({seller:req.seller._id});
    res.status(200).json({
      success:true,
      image : image
    })
  }
  else{
    
    console.log("req user",req.user);
    const image = await bannerImage.find({store_location:req.user.current_store_location});
    res.status(200).json({
      success:true,
      image : image
    })
  }
  res.status(200).json({
    success:true,
    
  })
})




const removeTmp = (path) => {
    fs.unlink(path, (err) => {
      if (err) {
        return next(new ErrorHander(err, 400));
      }
    });
  };
  