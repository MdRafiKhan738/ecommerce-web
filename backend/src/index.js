const express = require("express");
const connectdb = require("./db");
const cookieparser = require("cookie-parser");
const authroute = require("./route/AuthRoute");
const orderroute=require("./route/OrderRoute.js")
const adminorderroute=require("./route/AdminOrderRoute.js")
const cors=require("cors")

const productroute=require("./route/ProductRoute.jsx")
const cartRoutes = require('./route/CartRoutes.js');
const wishlistRoutes = require('./route/WishlistRoutes.js');
const reviewRoutes = require('./route/ReviewRoutes.js');
const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(cors({
  origin:["http://localhost:5173","http://localhost:5174"],
  credentials:true



}))
const userrouter = require("./route/UserRoute");

app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/reviews', reviewRoutes);
app.get("/", (req, res) => {
  res.status(200).json("welcome to rafi bazar backend system");
});



app.use("/auth", authroute);
app.use("/userroutes",userrouter)
app.use("/product",productroute)
app.use('/order',orderroute)
app.use("/adminorder",adminorderroute)
const port = 5000;

app.listen(port, async () => {
  console.log(`Server is running on ${port}`);
  await connectdb();
});
