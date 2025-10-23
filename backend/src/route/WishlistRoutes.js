const express = require('express');
const router = express.Router();
const Wishlist = require('../model/Wishlist.js');

// Toggle wishlist
router.post('/toggle', async(req,res)=>{
    const { userId, productId } = req.body;
    try{
        let wishlist = await Wishlist.findOne({userId});
        if(!wishlist){
            wishlist = new Wishlist({ userId, products: [productId] });
        } else {
            const index = wishlist.products.indexOf(productId);
            if(index>-1){
                wishlist.products.splice(index,1);
            } else {
                wishlist.products.push(productId);
            }
        }
        await wishlist.save();
        res.json(wishlist);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

// Get wishlist
router.get('/:userId', async(req,res)=>{
    try{
        const wishlist = await Wishlist.findOne({userId}).populate('products');
        res.json(wishlist);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

module.exports = router;
