const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).json({ message: "No token found" });
    }

    // 👇 Secret key from environment variable or fallback
    const SECRET_KEY = "flkdlfkdskfl;dsflsdkflskl;ksdlkflkfldkfl;sdkl;fksdkgjskgjnjfjgufdjgiosjgiofjgiojjfnfnjdfjgiofdfigjfijgdfjgidjgidjgjfigjfgdjgfdkgpdgodkgjdpgfgjdfjpdfjgdfjgjdojogjsogjdjgpjgopdfjgpfjgpjdogjdopgjsjgpdjgdfjgpjdfgojdfogjodjgosjgdfjgpjdfjgopfjgodjgidfjgdfjkmdfklvmdknkdvmdfkdnkfjgkldjgdjgksjgkdjgkdfmgkjgkfdjkjkgjdgkjgdfjgdfgksdjgfkgjkdfjgkfdjgksjgkdfjgkjdg";

    const verifyToken = jwt.verify(token, SECRET_KEY);

    if (!verifyToken) {
      return res.status(400).json({ message: "Invalid token" });
    }

    // ✅ Attach userId to request
    req.userId = verifyToken.userid;

    next();
  } catch (error) {
    console.log("🔥 isAuth Error:", error);
    return res.status(500).json({ message: `isAuth error: ${error.message}` });
  }
};

module.exports = isAuth;
