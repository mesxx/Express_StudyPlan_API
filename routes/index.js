var express = require("express");
var router = express.Router();

const student = require("./student");
const studyPlan = require("./study-plan");
const subject = require("./subject");

router.use("/student", student);
router.use("/study-plan", studyPlan);
router.use("/subject", subject);

module.exports = router;
