const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    userId: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }]
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
