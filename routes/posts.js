const express = require("express");
const router = express.Router();
const sendPost = require("../controllers/sendPost");

/*************************
 **		END POINTS		**
 *************************/

router.post("/sendpost", sendPost);

module.exports = router;
