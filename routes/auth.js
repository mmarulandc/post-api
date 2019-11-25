const express = require('express');
const router = express.Router();

const signup = require("../controllers/signup");
const login = require("../controllers/login.js")

/*************************
**		END POINTS		**
*************************/

router.post('/signup',signup)
router.post('/login', login)

module.exports = router;