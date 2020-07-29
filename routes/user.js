var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');



var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile',isLoggedIn, function (req, res, next) {
    //var messages = req.flash('error');
    res.render('user/profile');
});
router.get('/logout',isLoggedIn, function (req, res, next) {
    //var messages = req.flash('error');
    req.logout();
    res.redirect('/');
});
router.get('/',notLoggedIn, function (req, res, next) {
    next();
});

router.get('/signup', function (req, res, next) {
    var messages = req.flash('error');
    //console.log(messages);
    res.render('user/signup', {csrfToken: req.csrfToken(),messages: messages, hasErrors: messages.length>0});
});
router.post('/signup', passport.authenticate('local.signup', {

        failureRedirect: '/user/signup',
        failureFlash: true,
        successRedirect: '/user/profile'
    })
);

router.get('/signin', function (req, res, next) {
    var messages = req.flash('error');
    //console.log(messages);
    res.render('user/signin', {csrfToken: req.csrfToken(),messages: messages, hasErrors: messages.length>0});
});
router.post('/signin', passport.authenticate('local.signin', {

        failureRedirect: '/user/signin',
        failureFlash: true,
        successRedirect: '/user/profile'
    })
);



module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}