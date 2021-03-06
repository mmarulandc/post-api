const express = require("express");
const router = express.Router();
const sendPost = require("../controllers/sendPost");
const getPost = require("../controllers/getPost");
const deletePost = require("../controllers/deletePost");
const getAllPost = require("../controllers/getAllPost");
const findPost = require("../controllers/findPost");
const auth = require("../middlewares/check-auth");
/*************************
 **		END POINTS		**
 *************************/

router.post("/sendpost", auth, sendPost);
router.get("/getpost/:userID", auth, getPost);
router.get("/getallpost", auth, getAllPost);
router.delete("/deletepost/:postID", auth, deletePost);
router.post("/findpost",auth, findPost);

module.exports = router;
