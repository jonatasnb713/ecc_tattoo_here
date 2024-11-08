const router = require("express").Router();

const estoqueController = require("../controllers/estoque");

router.get("/", estoqueController.listAll);
router.get("/:id", estoqueController.findOne);
router.post("/", estoqueController.create);
router.put("/:id", estoqueController.update);
router.delete("/:id", estoqueController.destroy);

module.exports = router;
