const router = require("express").Router();

const documentsController = require("../controllers/documents");

const upload = require("../upload");

router.get("/", documentsController.listAll);
router.get("/:id", documentsController.findOne);
router.post("/", documentsController.create);
router.put("/:id", upload.single("file"), documentsController.update);
router.delete("/:id", documentsController.destroy);

// exporting routes to use in app
module.exports = router;
