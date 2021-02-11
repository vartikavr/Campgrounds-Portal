const express= require('express');
const app= express();
const router= express.Router();
const User= require('../models/user');
const catchAsync= require('../utils/catchAsync');
const passport= require('passport');
const users = require('../controllers/users'); // controller

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.registerUser));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local',{ failureFlash: true, failureRedirect: '/login'}) , users.loginUser);

router.get('/logout',users.logoutUser);

module.exports= router;