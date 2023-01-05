const express = require('express');
const {createSection,updateSection,getAllSection,getSingleSection,deleteSection,removeProductFromSection} = require('../controllers/sectionController');
const { upload } = require('../controllers/productController');
const { isAuthenticated, authorizedRoles } = require('../middleware/auth');

const router = express.Router();


router.route('/sections').get(isAuthenticated, getAllSection);

router.route('/section/:id').get(isAuthenticated, getSingleSection);
router.route('/seller/add-section').post(isAuthenticated,authorizedRoles("seller"), createSection);
router
  .route("/seller/section/:id")
  .put(isAuthenticated, authorizedRoles("seller"), updateSection);

 router.route('/seller/delete-section/:id').delete(isAuthenticated,authorizedRoles('seller'),deleteSection); 
 router.route('/seller/delete-section-product/:id').post(isAuthenticated,authorizedRoles('seller'),removeProductFromSection); 

module.exports = router;