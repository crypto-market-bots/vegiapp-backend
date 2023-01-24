const ErrorHander = require("../utils/errorhander");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { transporter, use } = require("../Config/email");
const sendEmail = require("../utils/sendEmail");
dotenv.config({ path: "../Config/config.env" });
const Location = require("../models/locationModel");
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const crypto = require("crypto");
const { runInNewContext } = require("vm");
const Seller = require("../models/sellerModel");
const userOtpVerification = require("../models/userOtpVerification");
const smsKey = process.env.SMS_SECRET_KEY;
const twilioNum = process.env.TWILIO_PHONE_NUMBER;

//register the user
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, phone, pincode } = req.body;
  if (!name || !email || !password || !phone || !pincode)
    return next(new ErrorHander("all fields are required"));
  const user = await User.findOne({
    $or: [{ email: email }, { phone: phone }],
  });
  const seller = await Seller.findOne({
    $or: [{ email: email }, { phone: phone }],
  });
  if (user || seller) {
    return next(new ErrorHander("User Already Exist", 403));
  } else {
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
      const store_location = await Location.findOne({
        is_store: true,
        pincode: pincode,
      });
      if (!store_location) {
        return next(
          new ErrorHander("Please provide a valid pincode for store", 400)
        );
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const doc = await User.create({
        name: name,
        email: email,
        password: hashPassword,
        phone: phone,
        current_store_location: store_location._id,
      });

      const saved_user = await User.findOne({ email: email });

      // Generate JWT Token
      const token = jwt.sign(
        { userID: saved_user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "5d" }
      );

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

//Login the user with phone number
exports.loginUserPhone = catchAsyncError(async (req, res, next) => {
  const { phone } = req.body;

  const user = await User.findOne({ phone });

  if (user) {
    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "5d",
    });

    res
      .status(200)
      .json({ success: true, message: "Login Successful", token: token });
  } else {
    return next(new ErrorHander("You are not a registered user", 400));
  }
});

//Login the user

exports.loginUserEmail = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    ////"hello");
    const user = await User.findOne({ email }).select("+password");
    if (user) {
      //  //user);
      const isMatch = await bcrypt.compare(password, user.password);
      if (user.email === email && isMatch) {
        // Generate JWT Token
        const token = jwt.sign(
          { userID: user._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "5d" }
        );

        //res.send({"status": "success","message":"LOGIN sucessful","token": token})
        res
          .status(200)
          .json({ success: true, message: "Login Successful", token: token });
      } else {
        return next(new ErrorHander("Email or password is not valid", 400));
      }
    } else {
      return next(new ErrorHander("Email or password is not valid", 400));
    }
  } else {
    return next(new ErrorHander("All fields are required", 400));
  }
});

//logOut User

exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//Send the email to the user to change its password

exports.sendUserPasswordResetEmail = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  if (email) {
    const user = await User.findOne({ email });

    if (user) {
     

      //send mail

      try {
        const otp = `${Math.floor(1000+Math.random()*9000)}`
       

        const saltRounds = 10;

        const hashOtp = await bcrypt.hash(otp,saltRounds);

        const newOtpVerification = await new userOtpVerification({
          userId:user._id,
          otp:hashOtp,
          createdAt:Date.now(),
          expiresAt:Date.now()+300000
        })
        await newOtpVerification.save();

        await sendEmail({
          email: user.email,
          subject: "Verify Your email",
          html: `<p>Enter this <b>${otp}</b> in the app to verify your email</p>.<p>This code expires in <b>5 Minutes</b></p>.`,
        });
        res.status(200).json({
          success:true,
          message:"Otp Sent successfully"
        })

      } catch (error) {
        //"e");
        return next(new ErrorHander(error,400));
      }
      // let info = await transporter.sendMail({
      //     from: process.env.EMAIL_FROM,
      //     to: user.email,
      //     subject: 'Password Reset Link',
      //     html: `<a href=${link}>Click Here</a> to reset your password`
      // })

      res.status(200).json({
        status: true,
        message: "Email send successfully",
      });
    } else {
      return next(new ErrorHander("Email doesn't exists", 400));
    }
  } else {
    return next(new ErrorHander("Email field is required", 400));
  }
});

// Verify Otp
exports.VerifyOtp = catchAsyncError(async(req,res,next)=>{
  const {otp,email} = req.body;
  if(!otp) return next(new ErrorHander("please enter the otp",400));
  if(!email) return next(new ErrorHander("please enter the email",400));
  const user = await User.findOne({ email });
  if(user){
         const otpVerify = await userOtpVerification.find({userId:user._id});
         if(otpVerify.length<=0) return next(new ErrorHander("Something Went wrong Please request again",400));
         const {expiresAt} = otpVerify[0];
         const hashOtp  = otpVerify[0].otp;
           console.log(expiresAt,hashOtp)
         if(expiresAt < Date.now()) {
          await userOtpVerification.deleteMany({userID:user._id});
          return next(new ErrorHander("Code has been expired . Please request again"));
         }

         const validOtp = await bcrypt.compare(otp,hashOtp);
         if(!validOtp){
          return next(new ErrorHander("Invalid Otp",400))
         }
         else{
          await userOtpVerification.deleteMany({userID:user._id});
          res.status(200).json({
            success:true,
            Otp :"Otp verify Successfully"
          })
         }

  }
  else{
    return next(new ErrorHander("User doen not exists",400))
  }
})


//user detils

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: "current_store_location",
  });

  res.status(200).json({
    success: true,
    user,
  });
});

//Change the password

//not completed
exports.changeUserPassword = catchAsyncError(async (req, res, next) => {
  const { old_password, password, confirm_password } = req.body;
  if (!old_password || !password || !confirm_password)
    return next(new ErrorHander("All fields are required"));
  const user = await User.findById(req.user.id).select("+password");
  if (!user) next(new ErrorHander("User does not exists", 400));
  // const isPasswordMatched = await user.comparePassword(old_password);
  const isPasswordMatched = await bcrypt.compare(old_password, user.password);
  if (!isPasswordMatched) {
    return next(new ErrorHander("Old_Password does'n match", 400));
  }
  if (password == old_password)
    return next(
      new ErrorHander("Current Password must not be same as new password")
    );
  if (password != confirm_password) {
    next(new ErrorHander("Passowrd and Confirm Password is mathch", 400));
  }

  if (isPasswordMatched) {
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
    await User.findByIdAndUpdate(user._id, {
      $set: { password: hashPassword },
    });

    res.status(200).json({
      success: true,
      message: "passord Change sucessfully",
    });
  }
  //isPasswordMatched);
});

//Updated User Profile
exports.updateUserProfile; //Not completed

//Get all the user -- Admin
exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//Get single User  -- Admin
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with this Id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//update User role : Admin

//Delete the User

// Add Delivery Address
exports.addDeliveryAddress = catchAsyncError(async (req, res, next) => {
  const {
    full_name,
    pincode,
    address_line_1,
    address_line_2,
    location_phone_number,
  } = req.body;
  if (
    pincode &&
    address_line_1 &&
    address_line_2 &&
    location_phone_number &&
    full_name
  ) {
    let user = await User.findById(req.user.id);
    if (!user) {
      return next(
        new ErrorHander(
          `User does not exist with this Id: ${req.params.id}`,
          404
        )
      );
    }
    const newDeliveryAdd = await Location.create({
      full_name: full_name,
      pincode: pincode,
      address_line_1: address_line_1,
      address_line_2: address_line_2,
      location_phone_number: location_phone_number,
    })
      .then((res) => {
        req.user.delivery_address.push(res._id);

        req.user.save();
      })
      .catch((err) => {
        return next(new ErrorHander(err, 400));
      });

    res.status(200).json({
      success: true,
    });
  } else {
    return next(new ErrorHander("all fields are required", 400));
  }
});

//delete the delivery address
exports.deleteDeliveryAddress = catchAsyncError(async (req, res, next) => {
  const deliveryId = req.params.id;
  const deliverDetails = await Location.findById(deliveryId);
  if(!deliverDetails){
    return next(new ErrorHander("this delivery address is not exits"))
  }
  console.log(deliverDetails)
  User.findById(req.user.id).exec(async(error,user)=>{
          if(error) return next(new ErrorHander(error,400));
          
          const isItsDelivery = user.delivery_address.findIndex(d=>d == deliveryId);
             if(isItsDelivery >= 0){
              user.delivery_address.splice(isItsDelivery,1);
              user.save();
              deliverDetails.remove();
              res.status(200).json({
                success:true,
                message:"Delivery address deleted successfully" 
              })
             }
          else{
            return next(new ErrorHander("This is not your address So, you are not able to delete this",400))
          }
  })
});

//change the delivery address
exports.changeDeliveryAddress = catchAsyncError(async(req,res,next) => {
  const deliveryId = req.params.id;
  const deliverDetails = Location.findById(deliveryId);
  if(!deliverDetails){
    return next(new ErrorHander("this delivery address is not exits"))
  }
  User.findById(req.user.id).exec(async(error,user)=>{
          if(error) return next(new ErrorHander(error,400));
          
          const isItsDelivery = user.delivery_address.findIndex(d=>d == deliveryId);
             if(isItsDelivery >= 0){
              await Location.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useFindAndModify: false,
              });
              res.status(200).json({
                success:true,
                message:"Delivery address Changed successfully" 
              })
             }
          else{
            return next(new ErrorHander("This is not your address So, you are not able to edit this",400))
          }
  })
})

//get all delivery location 
exports.getAllDeliveryLocation = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.user.id).populate([
    {
      path: "delivery_address",
      strictPopulate: false,
    },
  ]);
  res.status(200).json({
    success: true,
    user,
  });
});
