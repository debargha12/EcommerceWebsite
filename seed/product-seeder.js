var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Debargha:debarghaghosh12@cluster0.t0die.mongodb.net/shopping?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});

var products = [
    new Product({
        imagePath: 'https://cdn.animenewsnetwork.com/thumbnails/fit750x750/cms/daily-briefs/144961/001_size8-8.jpg',
        title: 'One Piece: The Movie',
        description: 'Awesome Game!!!!',
        price: 10
    }),
    new Product({
        imagePath: 'https://cdn.animenewsnetwork.com/thumbnails/fit750x750/cms/daily-briefs/144961/001_size8-8.jpg',
        title: 'Clockwork Island Adventure',
        description: 'Also awesome? But of course it was better in vanilla ...',
        price: 20
    }),
    new Product({
        imagePath: 'https://cdn.animenewsnetwork.com/thumbnails/fit750x750/cms/daily-briefs/144961/001_size8-8.jpg',
        title: 'Chopper\'s Kingdom on the Island of Strange Animals',
        description: 'Meh ... nah, it\'s okay I guess',
        price: 40
    }),
    new Product({
        imagePath: 'https://cdn.animenewsnetwork.com/thumbnails/fit750x750/cms/daily-briefs/144961/001_size8-8.jpg',
        title: 'Dead End Adventure',
        description: 'Now that is super awesome!',
        price: 15
    }),
    new Product({
        imagePath: 'https://cdn.animenewsnetwork.com/thumbnails/fit750x750/cms/daily-briefs/144961/001_size8-8.jpg',
        title: 'The Cursed Holy Sword',
        description: 'I died!',
        price: 50
    })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}