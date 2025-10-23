const mongoose=require("mongoose")
const userschema=new mongoose.Schema({
    name:{

        type:String,
        required:true
    },
    email:{

        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    cartdata:{

        type:Object,
        default:{}
    }











},{timestamps:true,minimize:false})
const user=mongoose.model("user",userschema)
module.exports=user