const upload = require("../services/file-upload");

const singleUpload = upload.single("image");
const sendPost = async (req, res) => {
  singleUpload(req,res,(err)=>{
    if(req.file) {
      console.log("there is an image")
      return "<h2>Hola</h2>"
    }
  });
};

module.exports = sendPost;
