const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "./Config/config.env" });
var bodyParser =  require('body-parser');
// app.use(bodyParser.json());
const fileUpload = require('express-fileupload')
app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles:true
  }))
  var cors = require('cors')
 
app.use(cors())

const products = require("./routes/productRoute");
const users = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const cart = require("./routes/cart");
const seller = require("./routes/sellerRoute");
const common = require('./routes/common');
const category = require('./routes/categoryRoute');
const favourite =  require('./routes/favouriteRoute');
const section = require("./routes/sectionRoute");
const deliveryBoy  = require("./routes/delieveryBoyRoute");
const { urlencoded } = require("body-parser");
// const product_route = require("./routes/productRoute")
console.log(__dirname);
// app.use( '/public/productImages',express.static(__dirname+'/public/productImages'));

// app.use('/api',product_route)
app.use("/api/v4", products);
app.use("/api/v4", users);
app.use("/api/v4", order);
app.use("/api/v4", cart);
app.use("/api/v4", seller);
app.use("/api/v4", common);
app.use("/api/v4", category);
app.use("/api/v4", favourite);
app.use("/api/v4",section);
app.use("/api/v4",deliveryBoy);
//middleware for errors
app.use(errorMiddleware);

module.exports = app;
