const mongoose =  require("mongoose");

const walletSchema = new mongoose.Schema({
    refer_id:{
        type:String,
        require:[true,"Please give the refer id"]
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    count:{
        type:Number,
        default:7
    },
    amount:{
        type:Number,
        default:0
    },
    createdAt:Date

});

module.exports = mongoose.model("Wallet",walletSchema);

