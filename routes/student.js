var express = require("express");
var router = express.Router();

const {
  create,
  read,
  update,
  destroy,
  readOne,
} = require("../controllers/student.controller");

router.post("/", create);
router.get("/", read);
router.get("/:id", readOne);
router.patch("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
