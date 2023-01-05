const ErrorHander = require("../utils/errorhander");
const Location = require("../models/locationModel");
const catchAsyncError = require("../middleware/catchAsyncError");


exports.allStore = catchAsyncError(async (req, res, next) => {
    stores_location = await Location.find({ is_store: true});
    res.status(200).json({
        success: true,
        stores_location,
    });
});
