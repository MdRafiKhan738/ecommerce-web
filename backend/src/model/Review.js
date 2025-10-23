const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
    user: String,
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
