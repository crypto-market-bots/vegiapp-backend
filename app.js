const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "./Config/config.env" });
var bodyParser =  require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.json());
app.use(cookieParser());

const products = require("./routes/productRoute");
const users = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const cart = require("./routes/cart");
const seller = require("./routes/sellerRoute");
const common = require('./routes/common');
const category = require('./routes/categoryRoute');
const favourite =  require('./routes/favouriteRoute');
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

//middleware for errors
app.use(errorMiddleware);

module.exports = app;
