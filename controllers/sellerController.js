const ErrorHander = require("../utils/errorhander");
const Seller = require("../models/sellerModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const Location = require("../models/locationModel");
const { transporter, use } = require("../Config/email");
const sendEmail = require("../utils/sendEmail");
const {broadcastMessage} = require('../Common/websocket');
const User = require("../models/userModel");
const locationModel = require("../models/locationModel");
dotenv.config({ path: "../Config/config.env" });

exports.registerSeller = catchAsyncError(async (req, res, next) => {
  console.log(req.body);
  const { name, email, password, phone, pincode,address ,city,state,storeName} = req.body;
  if(!name || !email || !password || !phone || !pincode  || !address || !city || !state) return next(new ErrorHander("All fields is Required",400));
  const store_city_title = storeName;
  const user = await User.findOne({
    $or: [{ email: email }, { phone: phone }],
  });
  const seller = await Seller.findOne({
    $or: [{ email: email }, { phone: phone }],
  });

  if (seller || user) {
    return next(new ErrorHander("seller Already Exist", 403));
  } else {
    if (!pincode || !store_city_title){
      return next(new ErrorHander("Please provide the store details", 400))
    }

    const location = await Location.findOne({pincode:pincode})
 
    if (location ){
      return next(new ErrorHander("Your store is alreadu exists"))
    }
     
    await Location.create({
        is_store : true,
        pincode : pincode,
        store_city_title : store_city_title,
        location_phone_number:phone,
        address_line_1:address,
        city:city,
        state:state
      }).then(()=>{
        console.log("successfully")
      }).catch((err)=>{
        return next(new ErrorHander(err,400));
      });;
   const loc = await Location.findOne({pincode:pincode})
    if (name && email && password && phone) {
      //password=password.trim();
      let trimmedpassword = password;
      trimmedpassword = trimmedpassword.trim();
      //trimmedpassword);
      if (trimmedpassword.length < 6) {
        return next(
          new ErrorHander(
            "password should be greater than or equal to 6 Characters",
            400
          )
        );
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      
    
      const doc = await Seller.create({
        name: name,
        email: email,
        password: hashPassword,
        phone: phone,
        store_location:loc._id,
      }).then(()=>{
        console.log("successfully")
      }).catch((err)=>{
        return next(new ErrorHander(err,400));
      });

      const saved_seller = await Seller.findOne({ email: email });

      // Generate JWT Token
      const token = jwt.sign(
        { sellerID: saved_seller._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "5d" }
      );
      const msg = 'refresh-users';
      broadcastMessage(msg)
      res.status(201).json({
        success: true,
        message: "Registeration Successful",
        token: token,
      });

      //  res.send({ "status": "failed", "message": "password and confirm password doesn't match" })
    } else {
      return next(new ErrorHander("All fields are required", 400));
      //res.send({ "status": "failed", "message": "All fields are required" })
    }
  }
});

//verify existence of the seller
exports.loginSellerEmail = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    ////"hello");
    const seller = await Seller.findOne({ email }).select("+password");
    if (seller) {
      //  //user);
      const isMatch = await bcrypt.compare(password, seller.password);
      if (seller.email === email && isMatch) {
        // Generate JWT Token
        const token = jwt.sign(
          { sellerID: seller._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "5d" }
        );
       
        //res.send({"status": "success","message":"LOGIN sucessful","token": token})
        res
          .status(200).json({ success: true, message: "Login Successful", token: token });
      } else {
        return next(new ErrorHander("Email or password is not valid", 400));
      }
    } else {
      return next(new ErrorHander("You are not a registered seller", 400));
    }
  } else {
    return next(new ErrorHander("All fields are required", 400));
  }
});

exports.getAllSellers = catchAsyncError(async (req, res, next) => {
  const sellers = await Seller.find().populate( {path:'store_location'});

  res.status(200).json({
    success: true,
    sellers,
  });
});

exports.getAllStores = catchAsyncError(async (req, res, next) => {
  const stores = await locationModel.find();

  res.status(200).json({
    success: true,
    stores,
  });
});

