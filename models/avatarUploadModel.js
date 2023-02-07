const mongoose = require("mongoose");

const avatarUploadSchema = new mongoose.Schema({
    image: {
        type: String,
        required: [true, "enter the image"],
      },
      public_image_id: {
        type: String,
        required: [true, "enter the public_image_id"],
      },
})
module.exports = mongoose.model("AvatarUpload",avatarUploadSchema);

