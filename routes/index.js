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



module.exports = router;