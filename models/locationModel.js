const mongoose = require("mongoose");
// const validate =  require("validator")
const locationSchema = new mongoose.Schema({
  full_name: {
    type: String,
    trim: true,
  },
  store_city_title: {
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
  is_store: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Location", locationSchema);
