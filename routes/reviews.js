const express= require('express');
const router= express.Router({mergeParams: true});
const Campground= require('../models/campground');
const Review= require('../models/review');
const expressError= require('../utils/expressError');
const {reviewSchema} = require('../schemas.js'); //reviewSchema from JOI
const reviews = require('../controllers/reviews'); //for controller

const catchAsync= require('../utils/catchAsync');

const {validateReview, isLoggedIn, isReviewAuthor}= require('../middleware.js');

router.post('/',isLoggedIn, validateReview,catchAsync(reviews.createReview));

router.delete('/:reviewId',isLoggedIn,isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;