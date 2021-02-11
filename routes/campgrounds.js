const express= require('express');
const router = express.Router();
const catchAsync= require('../utils/catchAsync');
const Campground= require('../models/campground');
const campgrounds = require('../controllers/campgrounds'); // from controllers

const multer= require('multer');
const {storage} = require('../cloudinary');
const upload= multer({storage});



//middlewares
const  {isLoggedIn, isAuthor, validateCampground}= require('../middleware'); 

router.route('/')
    .get(catchAsync(campgrounds.index)) //from controllers
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))
    

router.get('/new',isLoggedIn,campgrounds.renderNewForm)


router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground,catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))


router.get('/:id/edit',isLoggedIn, isAuthor, catchAsync(campgrounds.editCampground))

module.exports = router;