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
const smsKey = process.env.SMS_SECRET_KEY;
const twilioNum = process.env.TWILIO_PHONE_NUMBER;

//register the user

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, phone, pincode} = req.body;
  if(!name || !email || !password || !phone || !pincode) return next(new ErrorHander("all fields are required"));
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
      const store_location = await Location.findOne({is_store:true, pincode:pincode})
      if(!store_location){
        return next( new ErrorHander("Please provide a valid pincode for store", 400));
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const doc = await User.create({
        name: name,
        email: email,
        password: hashPassword,
        phone: phone,
        current_store_location : store_location._id,
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
      return next(new ErrorHander("You are not a registered user", 400));
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
      const secret = user._id + process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ userID: user._id }, secret, {
        expiresIn: "15m",
      });
      const link = `http://127.0.0.1:4000/api/user/reset/${user._id}/${token}`;

      //send mail
      try {
        await sendEmail({
          email: user.email,
          subject: "Password Reset Link",
          html: `<a href=${link}>Click Here</a> to reset your password`,
        });
      } catch (error) {
        //"e");
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

//// After filling new password clicking on Submit Button
exports.UserPasswordReset = catchAsyncError(async (req, res, next) => {
  const { password, confirm_password } = req.body;
  const { id, token } = req.params;
  const user = await User.findById(id);
  const new_secret = user._id + process.env.JWT_SECRET_KEY;

  if (!password || !confirm_password || !id || !token) {
    return next(new ErrorHander("All fields are required", 400));
  }
  try {
    jwt.verify(token, new_secret);
    if (password && confirm_password) {
      if (password === confirm_password) {
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
        const newHashPassword = await bcrypt.hash(password, salt);
        await User.findByIdAndUpdate(user._id, {
          $set: { password: newHashPassword },
        });

        //res.send({"status": "success", "message": "Password Reset Successfully"})
        res.status(200).json({
          success: true,
          message: "Password Reset Successfully",
        });
      } else {
        res.status(200).json({
          success: false,
          message: "Password and confirm password doesn't match",
        });
        //res.send({"status": "failed", "message": "Password and confirm password doesn't match"})
      }
    } else {
      res.status(200).json({
        success: false,
        message: "All fields are required",
      });
      //res.send({"status": "failed", "message": "All fields are required"})
    }
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Invalid Token",
    });
    // res.send({"status": "failed", "message": "Invalid Token"})
    //error);
  }
});

//user detils

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//Change the password

//not completed
exports.changeUserPassword = catchAsyncError(async (req, res, next) => {
  const { old_password, password, confirm_password } = req.body;
  if(!old_password || !password || !confirm_password) return next(new ErrorHander("All fields are required"))
  const user = await User.findById(req.user.id).select("+password");
  if (!user) next(new ErrorHander("User does not exists", 400));
  // const isPasswordMatched = await user.comparePassword(old_password);
  const isPasswordMatched = await bcrypt.compare(old_password, user.password);
  if (!isPasswordMatched) {
    return next(new ErrorHander("Old_Password does'n match", 400));
  }
  if(password == old_password) return next(new ErrorHander("Current Password must not be same as new password"));
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
  const { pincode, address_line_1, address_line_2, location_phone_number } =
    req.body;
  if (pincode && address_line_1 && address_line_2 && location_phone_number) {
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
      pincode: pincode,
      address_line_1: address_line_1,
      address_line_2: address_line_2,
      location_phone_number: location_phone_number,
    });

    req.user.delivery_address.push(newDeliveryAdd._id);
    req.user.save();

    res.status(200).json({
      success: true,
    });
  } else {
    return next(new ErrorHander("all fields are required", 400));
  }
});
