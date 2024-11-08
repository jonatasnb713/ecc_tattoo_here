const router = require("express").Router();

const usersController = require("../controllers/users");
const upload = require("../upload");

router.post("/login", usersController.checkLogin);

// exporting routes to use in app
module.exports = router;
