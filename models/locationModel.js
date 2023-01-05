const mongoose = require("mongoose");
// const validate =  require("validator")
const locationSchema = new mongoose.Schema({
    store_city_title :{
        type : String,
        trim:true,
        required:[true,"enter the location title"]
    },
    pincode :{
        type : Number,
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
    location_phone_number : {
        type : Number,
        minLength: [10,"Phone Number should be 10 Numbers"],
        maxLength:[10,"Phone Number should be 10 Numbers"],
    },
    is_store : {
        type : Boolean,
        default: true
    }
});
locationSchema.path('location_phone_number').validate(function validatePhone() {
    return ( this.location_phone_number > 999999999 && this.location_phone_number <= 9999999999);
  });
module.exports= mongoose.model("Location", locationSchema);