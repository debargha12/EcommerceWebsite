var express = require('express');
var router = express.Router();
var Product = require('../models/product');
//var Cart = require('../models/cart');
var csrf = require('csurf');
const passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);

router.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
});

router.get('/', function (req, res, next) {
    Product.find(function (err, docs) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/index', {title: 'Shopping Cart', products: productChunks});
    });
});

router.get('/user/signup', function (req, res, next) {
    var messages = req.flash('error');
    //console.log(messages);
    res.render('user/signup', {csrfToken: req.csrfToken(),messages: messages, hasErrors: messages.length>0});
});
router.post('/user/signup', passport.authenticate('local.signup', {

    failureRedirect: '/user/signup',
    failureFlash: true,
    successRedirect: '/user/profile'
})
);
router.get('/user/profile', function (req, res, next) {
    //var messages = req.flash('error');
    res.render('user/profile');
});
router.get('/user/signin', function (req, res, next) {
    var messages = req.flash('error');
    //console.log(messages);
    res.render('user/signin', {csrfToken: req.csrfToken(),messages: messages, hasErrors: messages.length>0});
});
router.post('/user/signin', passport.authenticate('local.signin', {

        failureRedirect: '/user/signin',
        failureFlash: true,
        successRedirect: '/user/profile'
    })
);

module.exports = router;