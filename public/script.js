async function cldUpload(options) {
    try {
      let response = await fetch("/.netlify/functions/bgremoval", options);
      let data = await response.json();
      const img = document.createElement("img");
      img.src = data.secure_url;
      img.alt = "bgremoval";
      document.getElementById("result").innerHTML = img.outerHTML;
    } catch (error) {
      console.log("client error", error);
    }
  }
  
  document
    .querySelector('button[type="submit"]')
    .addEventListener("click", (e) => {
      e.preventDefault();
  
      const url = document.getElementById("url").value;
      const publicId = document.getElementById("publicid").value;
      const tag = document.getElementById("tag").value;
  
      /* validate input */
      let warning = "";
      warning += !url ? "<li>Please enter a Cloudinary image URL</li>" : "";
      warning += !publicId ? "<li>Please enter Cloudinary publicid</li>" : "";
  
      if (warning)
        return (document.getElementById("warning").innerHTML = warning);
  
      document.getElementById("result").innerHTML = "Please wait...";
  
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url, publicid: publicId, tag: tag }),
      };
     cldUpload(options);
     
    });