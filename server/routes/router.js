var express = require("express");
var router = express.Router();

var mainCtrl = require("../controller/mainCtrl"); 

router.get("/", mainCtrl.home);
router.post("/search", mainCtrl.analyse);


module.exports = router;
