const post = require("../models/postModel");
var ObjectID = require("mongodb").ObjectID;

const getPost = async (req, res) => {
  try {
    let { userID } = req.params;
    let perPage = req.body.perPage || 2;
    let currentPage =  req.body.currentPage || 1;
    if (userID === null || userID === undefined || !ObjectID.isValid(userID)) {
      return res.status(400).json({
        message: "Ingrese un ID de usuario valido"
      });
    }
    let foundPost = await post
      .find({ creator: userID })
      .populate("creator", "username")
      .skip((perPage * currentPage) - perPage)
      .limit(perPage);
    if(foundPost.length === 0) {
      return res.status(404).json({
        message:'No se encontraron post asociados a este usuario'
      });
    }
    let numPost = await post.count({creator: userID});

    return res.status(200).json({
      message: "Se ha consultado correctamente",
      currentPage: currentPage,
      perPage: perPage,
      pages: Math.ceil(numPost/perPage),
      posts: foundPost.map(post => {
        return {
          creator: post.creator.username,
          creatorID: post.creator._id,
          postID: post._id,
          postTitle: post.title,
          postContent: post.content,
          postImage: post.img,
          createAt: post.created_at,
          updateAt: post.created_at
        };
      }),
      numResult: numPost
    });
  } catch (error) {
    console.log(`Ha ocurrido un error  ${error}`);
    return res.status(500).json({
      message: "Ha ocurrido un error, por favor intente más tarde"
    });
  }
};

module.exports = getPost;
