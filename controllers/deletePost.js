const post = require('../models/postModel');
const isEmpty = require('../utils/isEmptyJson');
const ObjectID = require('mongodb').ObjectID;

const deletePost = async (req, res) => {
  try {
    console.log('hols');
    let { postID } = req.params;
    let { userID } = req.body;
    if (userID === null || userID === undefined || !ObjectID.isValid(userID)) {
      return res.status(400).json({
        message: 'Ingrese un ID de usuario valido'
      });
    }
    if (postID === null || postID === undefined || !ObjectID.isValid(postID)) {
      return res.status(400).json({
        message: 'Ingrese un ID de post valido'
      });
    }

    let foundPost = await post.findById(postID);
    if (!isEmpty(foundPost)) {
      if (foundPost.creator.equals(userID)) {
        await post.findByIdAndDelete(postID);
      } else {
        return res.status(401).json({
          message: 'El usuario no es dueño del post a eliminar'
        });
      }
    } else {
      return res.status(404).json({
        message: 'Post no encontrado, verifique el ID del post'
      });
    }

    console.log(foundPost);
    return res.status(200).json({
      message: 'Se ha eliminado correctamente',
      foundpost: foundPost
    });
  } catch (error) {
    console.log(`Ha ocurrido un error  ${error}`);
    return res.status(500).json({
      message: 'Ha ocurrido un error, por favor intente más tarde'
    });
  }
};

module.exports = deletePost;
