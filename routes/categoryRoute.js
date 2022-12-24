const express = require('express');
const { createCategory, updateCategory, getAllCategory, getSingleCategory, deleteCategory, removeProductFromCategory } = require('../controllers/categoryController');
const { upload } = require('../controllers/productController');
const { isAuthenticated, authorizedRoles } = require('../middleware/auth');

const router = express.Router();


router.route('/categories').get(isAuthenticated, getAllCategory);

router.route('/category/:id').get(isAuthenticated, getSingleCategory);
router.route('/seller/add-category').post(isAuthenticated,authorizedRoles("seller"),upload.single("image"), createCategory);
router
  .route("/seller/category/:id")
  .put(isAuthenticated, authorizedRoles("seller"),upload.single("image"), updateCategory);

 router.route('/seller/delete-category/:id').delete(isAuthenticated,authorizedRoles('seller'),deleteCategory); 
 router.route('/seller/delete-category-product/:id').post(isAuthenticated,authorizedRoles('seller'),removeProductFromCategory); 

module.exports = router;