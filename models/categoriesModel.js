const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
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
  productsId: [
    {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    
  ],
});

module.exports = mongoose.model("Category", categoriesSchema);
