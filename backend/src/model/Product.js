const mongoose=require('mongoose')
const productschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image1:{

        type:String,
        required:true
    },
    image2:{
        type:String,
        required:true
    },
    image3:{

        type:String,
        required:true
    },
    image4:{

        type:String,
        required:true
    },
  
    
    
    description:{

        type:String,
        required:true
    },
    price:{

        type:Number,
        required:true
    },
    category:{

        type:String,
        required:true
    },
    subcategory:{

        type:String,
        required:true
    },
    sizes:{
        type:Array,
        required:true

    },
    date:{

        type:Number,
        required:true
    },
    bestseller:{

        type:Boolean,

    },
    rating:{

        type:Number,
        default:0
    },
    reviews:[{


        type:mongoose.Types.ObjectId,
        ref:'Review'
    }],
        userBought: { type: Boolean, default: true }







},{timestamps:true})
const products=new mongoose.model("products",productschema)
module.exports=products