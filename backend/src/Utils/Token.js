const secretkey="flkdlfkdskfl;dsflsdkflskl;ksdlkflkfldkfl;sdkl;fksdkgjskgjnjfjgufdjgiosjgiofjgiojjfnfnjdfjgiofdfigjfijgdfjgidjgidjgjfigjfgdjgfdkgpdgodkgjdpgfgjdfjpdfjgdfjgjdojogjsogjdjgpjgopdfjgpfjgpjdogjdopgjsjgpdjgdfjgpjdfgojdfogjodjgosjgdfjgpjdfjgopfjgodjgidfjgdfjkmdfklvmdknkdvmdfkdnkfjgkldjgdjgksjgkdjgkdfmgkjgkfdjkjkgjdgkjgdfjgdfgksdjgfkgjkdfjgkfdjgksjgkdfjgkjdg"
const jwt=require("jsonwebtoken")
const gentoken=async (userid)=>{
    try{
        let token= jwt.sign({userid},secretkey,{expiresIn:"24h"})
        return token



    }
    catch(error){
        console.log("Token error")



    }






}



const gentoken1=async (email)=>{
    try{
        let token= jwt.sign({email},secretkey,{expiresIn:"24h"})
        return token



    }
    catch(error){
        console.log("Token error")



    }






}
module.exports={gentoken,gentoken1}
