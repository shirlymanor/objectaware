require("dotenv").config();
const cloudinary = require("cloudinary").v2;
exports.handler = async (event, context) => {
  console.log(
    "config",
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    }).cloud_name
  );
  console.log("logging process.env", process.env.CLOUD_NAME);

  const existingUrl = JSON.parse(event.body).url;
  const newPublicId = JSON.parse(event.body).publicid;
  const tag = JSON.parse(event.body).tag;
  console.log(existingUrl, newPublicId, tag);

  try {
    const result = await cloudinary.uploader.upload(existingUrl, {
      public_id: newPublicId,
      tag: tag,
      background_removal: 'cloudinary_ai',
    });
    const retBody = JSON.stringify({ secure_url: result.secure_url });
    console.log(retBody);
    console.log("rrrrrrrr");

    return {
      statusCode: 200,
      body: retBody,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error,
      }),
    };
  }

  
};