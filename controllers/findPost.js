const post = require("../models/postModel");

const findPost = async (req, res) => {
  try {
    let { search } = req.body;
    let perPage = req.body.perPage || 2;
    let currentPage = req.body.currentPage || 1;
    if (search === null || search === undefined || search.lenght === 0) {
      return res.status(400).json({
        message:
          "Ingrese por favor un parametro de busqueda, e intente nuevamente"
      });
    }
    let posts = await post
      .find({ $text: { $search: search } })
      .populate("creator", "username")
      .select("img content title created_at updated_at")
      .skip(perPage * currentPage - perPage)
      .limit(perPage);
    if (posts.length === 0) {
      return res.status(404).json({
        message: "No se encontraron posts, intente de nuevo por favor"
      });
    }
    let numPost = await post.count({ $text: { $search: search } });
    return res.status(200).json({
      message: "Consulta realizada con exito",
      currentPage: currentPage,
      perPage: perPage,
      pages: Math.ceil(numPost / perPage),
      posts: posts.map(post => {
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
      numPost: numPost
    });
  } catch (error) {
    console.log(`Hubo un error ${error}`);
    return res.status(500).json({
      message:
        "Ha ocurrido un error haciendo la busqueda, por favor intentelo más tarde"
    });
  }
};
module.exports = findPost;
