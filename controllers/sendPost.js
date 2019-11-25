const upload = require("../utils/file-upload");

const singleUpload = upload.single("image");
const sendPost = async (req, res) => {
  console.log("hola")
  singleUpload(req,res,(err)=>{
    console.log("hola")
    if(req.file) {
      console.log("there is an image")
      res.json({'imageUrl':req.file.location})
    }
  });
};

module.exports = sendPost;
