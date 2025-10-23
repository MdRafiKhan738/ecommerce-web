const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadoncloudinary = async (filepath) => {
  cloudinary.config({
    cloud_name:"dtb3atrxy",
    api_key: "341897483987157",
    api_secret: "Jfs4wsz2Sg5o4FeMETOBGChf1I4"
  });

  try {
    if (!filepath) {
      console.log("⚠️ No file path received!");
      return null;
    }

    console.log("📂 Uploading file from path:", filepath);

    const uploadResult = await cloudinary.uploader.upload(filepath);

    // ফাইল delete করো যদি এখনও থাকে
    if (fs.existsSync(filepath)) fs.unlinkSync(filepath);

    return uploadResult.secure_url;

  } catch (error) {
    console.error("❌ Cloudinary upload error:", error);
    if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
    throw error;
  }
};

module.exports = uploadoncloudinary;
