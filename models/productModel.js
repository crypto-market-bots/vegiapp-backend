const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },

  description: {
    type: String,
    required: [true, "Please enter tyhe product description"],
  },
  discount: {
    type: Number,
    default: 0,
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: "Seller",
    required: true,
    select:false
  },
  real_price: {
    type: Number,
    required: [true, "Please enter tyhe product Price"],
    maxLength: [8, "price cannot exceed 8 characters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  image: {
    type:String,
    required: [true,"enter the image"]
  },
  public_image_id: {
    type:String,
    required : [true,"enter the public the image id"]
  },
  categories: [
    {
      type: String,
      required: [true, "enter the product category"],
    },
  ],
  section: [
    {
      type: String,
      required: [true, "enter the product section"],
    },
  ],
  product_type:{
    type: String,
    required: [true, "Please enter the your product_type like as vegetble,fruit"],
  },
  stock: {
    type: Number,
    required: [true, "enter the product stock"],
    maxLength: [4, "stock cannot exceed 4 characters"],
    
  },
  type_quantity: {
    type: String,
    required: [true, "Please enter the your quantity like as kg"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
  last_update_At: {
    type: Date,
    default: Date.now,
  },
  hide_item: {
    type: Boolean,
    default: false,
  },
  out_of_stock: {
    type: Boolean,
    default: false,
  },
  stock_alert: {
    type:Number,
    required: [true,"enter the stock alert"]
  },
  quantity:{
    type:Number,
    required:[true,"enter the quantity"]
  },
  product_location:{
    type:String,
    required:[true,"enter product location"]
  }
  //section
  //count
});
module.exports = mongoose.model("Product", productSchema);


// -> req.user.current_location.pincode == Items.seller.location.pincode 