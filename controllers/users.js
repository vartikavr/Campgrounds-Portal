const User = require('../models/user');

module.exports.renderRegister  = (req,res)=>{
    res.render('users/register');
}

module.exports.registerUser = async(req,res)=>{
    try{
        const {username, email ,password}= req.body;
        const user= new User({email, username});
        const registeredUser= await User.register(user,password);
        req.login(registeredUser,err =>{
            if(err)
                return next(err);
            req.flash('success','Welcome to YelpCamp!');
            res.redirect('/campgrounds'); 
        })
    }
    catch(e){
        req.flash('error',e.message); //for errors like not unique username, etc
        res.redirect('register');
    }
}

module.exports.renderLogin = (req,res)=>{
    res.render('users/login');
}

module.exports.loginUser = (req,res)=>{
    req.flash('success','Welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logoutUser = (req,res)=>{
    req.logout();
    req.flash('success',"Goodbye! You've logged out.");
    res.redirect('/campgrounds')
}