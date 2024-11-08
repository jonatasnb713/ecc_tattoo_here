const router = require("express").Router();

const clientsController = require("../controllers/clients");

router.get("/", clientsController.listAll);
router.get("/:id", clientsController.findOne);
router.post("/", clientsController.create);
router.put("/:id", clientsController.update);
router.delete("/:id", clientsController.destroy);

// exporting routes to use in app
module.exports = router;
