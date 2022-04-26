const express = require('express');
const router = express.Router({ mergeParams: true });
const campgrounds = require('../controllers/camgrounds');
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const { storage } = require('../cloudinary');
const multer = require('multer');
const upload = multer({ storage })


router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCamp))


router.get('/new', isLoggedIn, campgrounds.newCampForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCamp))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCamp))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCamp))



router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.editCampForm));


module.exports = router;