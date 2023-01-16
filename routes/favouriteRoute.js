const express = require('express');
const { addItemToFavourite, removeItemFromFavourite, getAllFavourite } = require('../controllers/favouriteController');
const { isAuthenticated, authorizedRoles } = require('../middleware/auth');
const router = express.Router();

router.route('/user/add-item-to-favourite').post(isAuthenticated,authorizedRoles('user','delivery'), addItemToFavourite);
router.route('/user/remove-item-to-favourite').post(isAuthenticated,authorizedRoles('user','delivery'),removeItemFromFavourite);

router.route('/user/getallfavourite').get(isAuthenticated,authorizedRoles('user','delivery'),getAllFavourite);


module.exports = router;