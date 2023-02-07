const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    seller_id:{
        type: mongoose.Schema.ObjectId,
        ref: "Seller",
        required: true,
    },
  name: {
    type: String,
    required: [true, "write the name of your Category"],
  },
  image: {
    type: String,
    required: [true, "enter the image"],
  },
  public_image_id: {
    type: String,
    required: [true, "enter the public_image_id"],
  },
  productsId: [
    {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    
  ],
});

module.exports = mongoose.model("Section", sectionSchema);
