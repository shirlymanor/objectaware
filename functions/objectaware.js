require("dotenv").config();
const cloudinary = require("cloudinary").v2;
exports.handler = async (event, context) => {
  console.log(
    "config",
    cloudinary.config({
      cloud_name: process.env.cloud_name,
      api_key: process.env.api_key,
      api_secret: process.env.api_secret,
    }).cloud_name
  );
  console.log("logging process.env", process.env.cloud_name);

  const existingUrl = JSON.parse(event.body).url;
  const newPublicId = JSON.parse(event.body).publicid;
  console.log(existingUrl, newPublicId);

  try {
    const result = await cloudinary.uploader.upload(existingUrl, {
      public_id: newPublicId
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