const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo_id: {
    full_name: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    pincode: {
      type: Number,
      required: [true, "required pincode"],
    },
    address_line_1: {
      type: String,
      trim: true,
    },
    address_line_2: {
      type: String,
      trim: true,
    },
    location_phone_number: {
      type: String,
      minLength: [10, "Phone Number should be 10 Numbers"],
      maxLength: [10, "Phone Number should be 10 Numbers"],
    },
  },
  orderItems: [
    {
      price: {
        type: Number,
        required: true,
      },
      discount:{
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },

      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  coin:{
    type:Number,

  },
  itemsPrice: {
    type: Number,
    required: true,
  },
  taxPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  shippingPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  totalPrice: {
    type: Number,
   
    required: true,
  },

  orderStatus: {
    type: String,
    required: true,
    default: "initiated",
  },
  deliveredDate: {
    type: String,
  },
 createdDate: {
    type: String,
  },
  deliveryBoy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  store_location: {
    type: mongoose.Schema.ObjectId,
    ref: "Location",
  },

  trans_status: {
    type: String,
  },

  order_id: {
    type: String,
    
  },

  razorpay_receipt_id: {
    type: String,
  },

  payment_id: {
    type: String,
  },

  signature: {
    type: String,
  },
  rating:{
    type:Number
  },
  comment:{
    type:String
  }
});

module.exports = mongoose.model("Order", orderSchema);
