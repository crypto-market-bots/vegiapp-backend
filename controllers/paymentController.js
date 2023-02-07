const dotenv = require("dotenv");
dotenv.config({ path: "./Config/config.env" });
const Razorpay = require('razorpay')
const PaymentDetail =  require('../models/payment-detail')
const Product = require("../models/productModel")
import { nanoid } from 'nanoid'

let razorPayInstance = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_KEY_SECRET
})

exports.createOrder = catchAsyncError(async (req, res, next) => {
    const itemQuantityType = req.body.item_quantity_type
    const itemQuantity = req.body.item_quantity

    let product = Product.findBy(req.body.item_id);
    if (!product) {
        return next(new ErrorHander("Product Not Found !", 404));
    }

    if ((product.type_quantity != itemQuantityType) || (itemQuantity * product.real_price == req.body.amount)){
        return next(new ErrorHander("Order failed !", 404));
    }

	orderParams = {
		amount: req.body.amount * 100,
		currency: "INR",
		receipt: nanoid(),
		payment_capture: "1"
	}
	razorPayInstance.orders.create(orderParams)
	.then(async (response) => {
		const razorpayKeyId = process.env.RAZORPAY_KEY_ID
		// Save orderId and other payment details
		const paymentDetail = new PaymentDetail({
			orderId: response.id,
			receiptId: response.receipt,
			amount: response.amount,
			currency: response.currency,
			createdAt: response.created_at,
			trans_status: response.status,
		})
        await paymentDetail.save()
        res.status(201).json({
            success: true,
            paymentDetail,
            razorpayKeyId
          });

	}).catch((err) => {
		if (err){
            return next(new ErrorHander("Try Again Something is wrong"));
        }
	})
});


exports.verifyOrder = catchAsyncError(async (req, res, next) => {
	body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
	let crypto = require("crypto");
	let expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
							.update(body.toString())
							.digest('hex');

	if(expectedSignature === req.body.razorpay_signature) {
		await PaymentDetail.findOneAndUpdate(
			{ order_id: req.body.razorpay_order_id },
			{
				payment_id: req.body.razorpay_payment_id,
				signature: req.body.razorpay_signature,
				trans_status: "paid"
			});
            res.status(200).json({
                success: true,
                message: "order placed successfully"
              });
	} else {
		return next(new ErrorHander("Invalid Signature !"));
	}
});