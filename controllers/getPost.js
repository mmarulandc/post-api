const post = require('../models/postModel');
var ObjectID = require('mongodb').ObjectID;

const getPost = async (req, res) => {
  try {
    let { userID } = req.params;
    if (userID === null || userID === undefined || !ObjectID.isValid(userID)) {
      return res.status(400).json({
        message: 'Ingrese un ID de usuario valido'
      });
    }
    let foundPost = await post.find({creator: userID}).populate()
    console.log(foundPost)
    return res.status(200).json({
      message:"Se ha consultado correctamente",
      foundpost: foundPost
    });
  } catch (error) {
    console.log(`Ha ocurrido un error  ${error}`)
    return res.status(500).json({
      message: 'Ha ocurrido un error, por favor intente más tarde'
    });
  }
};

module.exports = getPost;