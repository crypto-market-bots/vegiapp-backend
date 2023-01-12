const catchAsyncError = require("../middleware/catchAsyncError");

exports.checkValidity = catchAsyncError(async(req,res,next)=>{
    res.status(200).json({
        success:true
    })
})