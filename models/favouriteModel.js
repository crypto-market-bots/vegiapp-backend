const mongoose =  require('mongoose');

const favoiriteSchema = new mongoose.Schema({
   user :{
    type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
   },
   productsId: [
    {
     
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    
  ],
    
})

module.exports = mongoose.model("Favourite", favoiriteSchema);
