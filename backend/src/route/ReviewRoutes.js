const express = require('express');
const router = express.Router();
const Review = require('../model/Review.js');
const Product = require('../model/Product.js');

// Add review (verified buyer)
router.post('/add', async(req,res)=>{
    const { productId, user, rating, comment } = req.body;
    try{
        const review = new Review({ product: productId, user, rating, comment });
        await review.save();
        const product = await Product.findById(productId);
        product.reviews.push(review._id);

        // Update rating average
        const reviews = await Review.find({product:productId});
        const avg = reviews.reduce((sum,r)=>sum+r.rating,0)/reviews.length;
        product.rating = avg;
        await product.save();

        res.json(review);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

// Get all reviews for product
router.get('/:productid', async(req,res)=>{
    try{
        const reviews = await Review.find({product:req.params.productId});
        res.json(reviews);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

module.exports = router;
