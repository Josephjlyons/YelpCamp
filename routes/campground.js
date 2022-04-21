const express = require('express');
const router = express.Router({ mergeParams: true });
const campgrounds = require('../controllers/camgrounds');
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');



router.get('/', catchAsync(campgrounds.index));

router.get('/new', isLoggedIn,campgrounds.newCampForm);

router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCamp));

router.get('/:id', catchAsync(campgrounds.showCamp));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.editCampForm));

router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCamp));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCamp));

module.exports = router;