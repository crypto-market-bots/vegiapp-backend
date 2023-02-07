const express = require("express");
const router = express.Router();

const {
  getallProduct,
  createProduct,
  updateProduct,
  deleteProducts,
  getSingleProduct,
  createProductReview,
  getAllReviews,
  deleteReview,
  upload,
  getAllProductWithSellerId,
} = require("../controllers/productController");
const { isAuthenticated, authorizedRoles } = require("../middleware/auth");

// const product_route = express();

// product_route.use(express.static('public'));

// product_route.post('/add-product',isAuthenticated,authorizedRoles('admin'),upload.single('im'),createProduct)

router.route("/products").get(isAuthenticated, getallProduct);
router
  .route("/seller/productsWithSellerId")
  .get(isAuthenticated, authorizedRoles("seller"), getAllProductWithSellerId);

router
  .route("/seller/product/new")
  .post(
    isAuthenticated,
    authorizedRoles("seller"),
    createProduct
  );

router
  .route("/admin/product/:id")
  .put(
    isAuthenticated,
    authorizedRoles("seller"),
    
    updateProduct
  )
  .delete(isAuthenticated, authorizedRoles("seller"), deleteProducts);

router.route("/product/:id").get(getSingleProduct);

router.route("/review").put(isAuthenticated, createProductReview);

router
  .route("/reviews")
  .get(getAllReviews)
  .delete(isAuthenticated, deleteReview);

// modue.exports = product_route;
module.exports = router;
