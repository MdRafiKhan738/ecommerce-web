const jwt =require("jsonwebtoken")

const adminauth=async (req,res,next)=>{
   try {
     const  secretKey= "flkdlfkdskfl;dsflsdkflskl;ksdlkflkfldkfl;sdkl;fksdkgjskgjnjfjgufdjgiosjgiofjgiojjfnfnjdfjgiofdfigjfijgdfjgidjgidjgjfigjfgdjgfdkgpdgodkgjdpgfgjdfjpdfjgdfjgjdojogjsogjdjgpjgopdfjgpfjgpjdogjdopgjsjgpdjgdfjgpjdfgojdfogjodjgosjgdfjgpjdfjgopfjgodjgidfjgdfjkmdfklvmdknkdvmdfkdnkfjgkldjgdjgksjgkdjgkdfmgkjgkfdjkjkgjdgkjgdfjgdfgksdjgfkgjkdfjgkfdjgksjgkdfjgkjdg"
    let {token}=req.cookies
    if(!token){


        return res.status(400).json({message:"not authrized, login again"})
    }
    let verifytoken=jwt.verify(token,secretKey)
    if (!verifytoken){

        return res.status(400).json({message:`Invalid Token`})
    }
    req.adminEmail="boymrhunny@gmail.com" &&"wonderfulnatuare@gmail.com",
    next()
    
   } catch (error) {
     return res.status(500).json(` adminerror :${error}`)
    
   }
















}
module.exports=adminauth