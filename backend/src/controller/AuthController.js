const user = require("../model/User.js");
const validator = require("validator");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { gentoken, gentoken1 } = require("../Utils/Token.js");


const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existinguser = await user.findOne({ email });
    if (existinguser) {
      return res
        .status(400)
        .json(`User with this ${email} is already registered`);
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter a valid email" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Please enter a strong password" });
    }

    const hashpass = await bcrypt.hash(password, 100000);
    const newUser = await user.create({ name, email, password: hashpass });
    const token = await gentoken(newUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(newUser);
  } catch (error) {
    console.log("register error:", error);
    return res.status(500).json({ message: `register error ${error}` });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(400).json(`User With this ${email} not exist`);
    }

    let ismatch = await bcrypt.compare(password, existingUser.password);
    if (!ismatch) {
      return res.status(400).json(`Invalid Password`);
    }

    const token = await gentoken(existingUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({message:`Login Successfully`});

  } catch (error) {
    return res.status(400).json(`Login error: ${error}`);
  }
};
const logout=async (req,res)=>{
    try{
        res.clearCookie('token')
        return res.status(200).json(`Logout Sucessfully`)


    }
    catch(error){
        return res.status(400).json({message:error.message})






    }






}
const googlelogin = async (req, res) => {
  try {
    const { name, email } = req.body;

    // আগের ইউজার খুঁজে বের করা
    let existingUser = await user.findOne({ email });

    // না থাকলে নতুন ইউজার তৈরি
    if (!existingUser) {
      existingUser = await user.create({ name, email });
    }

    // এখন টোকেন জেনারেট করা
    const token = await gentoken(existingUser._id);

    // কুকি সেট করা
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login successfully with Google" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === "boymrhunny@gmail.com" ,'wonderfulnatuare@gmail.com'&& password === "12345678") {
      const token1 = await gentoken1(email);

      res.cookie("token", token1, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });
       

res.status(200).json({ success: true, message: "Admin login successful",token:token1 })

     

    } else {
      return res.status(400).json({ message: "Invalid admin credentials" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};




// ✅ এইভাবে দুইটা ফাংশন একসাথে এক্সপোর্ট করতে হবে
module.exports = { register, login,logout,googlelogin,adminlogin};
