const express=require("express");
const app= express();

const dotenv=require("dotenv");
dotenv.config({path:"b/Config/config.env"})

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const crypto = require('crypto');
const catchAsyncError = require("./catchAsyncError");
const ErrorHander = require("../utils/errorhander");
const smsKey = process.env.SMS_SECRET_KEY;
const twilioNum = process.env.TWILIO_PHONE_NUMBER;



//for check the correct otp
exports.otpVerification = catchAsyncError ( async(req, res,next) => {

	let phone = req.body.phone;
	const hash = req.body.hash;
	const otp = req.body.otp;
	phone = "+91"+phone; 
	if(!(phone && hash && otp) ){
       return next(new ErrorHander("Please enter the credantials",400))
	}
	let [ hashValue, expires ] = hash.split('.');

	let now = Date.now();
	if (now > parseInt(expires)) {
		return res.status(504).send({ msg: 'Timeout. Please try again' });
	}
	let data = `${phone}.${otp}.${expires}`;
	let newCalculatedHash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');
	if (newCalculatedHash === hashValue) {
        next();
		// console.log('user confirmed');
		// const accessToken = jwt.sign({ data: phone }, JWT_AUTH_TOKEN, { expiresIn: '30s' });
		// // const refreshToken = jwt.sign({ data: phone }, JWT_REFRESH_TOKEN, { expiresIn: '1y' });
		// // refreshTokens.push(refreshToken);
		// res
		// 	.status(202)
		// 	.cookie('accessToken', accessToken, {
		// 		expires: new Date(new Date().getTime() + 30 * 1000),
		// 		sameSite: 'strict',
		// 		httpOnly: true
		// 	})
		// 	.cookie('refreshToken', refreshToken, {
		// 		expires: new Date(new Date().getTime() + 31557600000),
		// 		sameSite: 'strict',
		// 		httpOnly: true
		// 	})
		// 	.cookie('authSession', true, { expires: new Date(new Date().getTime() + 30 * 1000), sameSite: 'strict' })
		// 	.cookie('refreshTokenID', true, {
		// 		expires: new Date(new Date().getTime() + 31557600000),
		// 		sameSite: 'strict'
		// 	})
		// 	.send({ msg: 'Device verified' });
	} else {
		 return next(new ErrorHander("Incorrect Crediantals",401));
	}
});

