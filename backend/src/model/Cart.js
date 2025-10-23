const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: String,
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
            quantity: { type: Number, default: 1 }
        },
          
    ],
     totalPrice: { type: Number, default: 0 },
});

module.exports = mongoose.model('Cart', cartSchema);
