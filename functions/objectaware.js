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
      public_id: newPublicId,
      detection: "cld-fashion_v2",
      auto_tagging: 0.6
    });
    const retBody = JSON.stringify({ secure_url: result.secure_url });
    console.log(retBody);
    console.log("rrrrrrrr");
    const att = result.info.detection.object_detection.data['cld-fashion'].tags
  const color = ["red","blue","green","orange","yellow","olive"]
  let i = 0;
  global_trans = ""
  console.log(att)
  for (const [key, value] of Object.entries(att)) {
    confidence = (Math.round(value[0]['confidence'] * 100) / 100).toFixed(2);
    x = value[0]['bounding-box'][0]
    y = value[0]['bounding-box'][1]
    width = value[0]['bounding-box'][2]
    hight = value[0]['bounding-box'][3] 
    addtext = "l_text:arial_20:" + key + " " + confidence + ",co_" + color[i] +",x_" + Math.round(x) + ",y_" + Math.round(y+20) 
    addtextloc = "/g_north_west,x_" + Math.round(x) + ",y_" + Math.round(y-20) + ",fl_layer_apply"
    addimg = "/l_sample,w_" + Math.round(width) + ",h_" + Math.round(hight)
    dimention = "/x_"+ Math.round(x) + ",y_" + Math.round(y) + ",g_north_west,"
    addborder = "o_0,fl_layer_apply,bo_5px_solid_" + color[i]
    i++;
    raw_transformation = addtext + addtextloc + addimg + dimention + addborder
    global_trans = global_trans + "/" + raw_transformation
}
retBody = cloudinary.url(result.public_id,{raw_transformation:global_trans});
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