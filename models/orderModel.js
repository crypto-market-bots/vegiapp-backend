const mongoose=require('mongoose');

const orderSchema = new mongoose.Schema({

    shippingInfo_id: {
        type: mongoose.Schema.ObjectId,
           ref: "Location",
           required: true,
    },
    orderItems: [
        {
           
            price: {
                type:Number,
                required:true,
            },
            quantity: {
                type:Number,
                required:true,
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
    
    itemsPrice: {
        type: Number,
        default: 0,
        required:true
    },
    taxPrice: {
        type: Number,
        default: 0,
        required:true
    },
    shippingPrice: {
        type: Number,
        default: 0,
        required:true
    },
    totalPrice: {
        type: Number,
        default: 0,
        required:true
    },
    
    orderStatus: {
        type: String,
        required: true,
        default: "Initiated",
    },
    deliveredAt: {
        type: String,
        default: Date.now,
    },

    createdAt: {
        type: String,
        default: Date.now,
    },

  //delivery boy section
  //upi section

});

module.exports = mongoose.model("Order",orderSchema);
 