const upload = require('../utils/file-upload');
const post = require('../models/postModel');
var ObjectID = require('mongodb').ObjectID;

const singleUpload = upload.single('image');

const sendPost = async (req, res) => {
  try {
    singleUpload(req, res, async err => {
      let { title, content, creatorId } = req.body;
      let postSaved = {};
      if (err) {
        return res.status(400).send({
          error: [{ title: 'file upload error', detail: err.message }]
        });
      }
      if (req.file) {
        let img = req.file.location;
        Object.assign(postSaved, { img });
      }
      //validaciones de campos
      if (
        creatorId !== null &&
        creatorId !== undefined &&
        ObjectID.isValid(creatorId)
      ) {
        Object.assign(postSaved, { creatorId });
      } else {
        return res.status(400).json({
          message: 'El Id de usuario del post es requerido'
        });
      }

      if (title !== null && title !== undefined) {
        Object.assign(postSaved, { title });
      } else {
        return res.status(400).json({
          message: 'El titulo del post es requerido'
        });
      }
      if (content !== null && content !== undefined) {
        Object.assign(postSaved, { content });
      } else {
        return res.status(400).json({
          message: 'El contenido del post es requerido'
        });
      }
      let newPost;
      if (postSaved.img) {
        newPost = new post({
          creator: postSaved.creatorId,
          img: postSaved.img,
          content: postSaved.content,
          title: postSaved.content
        });
        await newPost.save();
      } else {
        newPost = new post({
          creator: postSaved.creatorId,
          content: postSaved.content,
          title: postSaved.content
        });
        await newPost.save();
      }
      console.log(postSaved);
      return res.status(200).json({
        message: 'Post exitoso'
      });
    });
  } catch (error) {
    res.status(500).json({
      message:
        'Ha ocurrido un error al registrarse, por favor intentelo más tarde'
    });
    console.log(`Ha ocurrido un error ${err}`);
  }
};

module.exports = sendPost;
