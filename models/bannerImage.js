const mongoose  = require("mongoose")

const bannerImage = new mongoose.Schema({
    image: {
        type: String,
        required: [true, "enter the image"],
      },
      public_image_id: {
        type: String,
        required: [true, "enter the public_image_id"],
      },
      seller:{
        type: mongoose.Schema.ObjectId,
        ref: "Seller",
        required: true,
      },
      store_location :{
        type: mongoose.Schema.ObjectId,
        ref: "Location",
        required: true,
      }
})


module.exports = mongoose.model("baanerImage",bannerImage);