const post = require("../models/postModel");

module.exports = async (req, res) => {
  try {
    let perPage = req.body.perPage || 2;
    let currentPage = req.body.currentPage || 1;
    let foundPost = await post
      .find()
      .populate("creator", "username")
      .skip(perPage * currentPage - perPage)
      .limit(perPage);
    if (foundPost.length === 0) {
      return res.status(404).json({
        message: "aún no hay post disponibles"
      });
    }
    let numPost = await post.count();
    return res.status(200).json({
      message: "Se ha consultado correctamente",
      currentPage: currentPage,
      perPage: perPage,
      pages: Math.ceil(numPost / perPage),
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
  } catch (err) {
    console.log(err);
    return res.status.json(500).json({
      message:
        "No es posible consultar ahora mismo, por favor intente más tarde"
    });
  }
};
