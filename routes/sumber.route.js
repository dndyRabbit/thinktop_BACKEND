const router = require("express").Router();
const sumberCtrl = require("../controllers/sumber.controller");

router.post("/sumber", sumberCtrl.postSumber);

router.get("/sumber", sumberCtrl.getSumber);
router.put("/sumber/:uuid_sumber", sumberCtrl.putSumber);
router.delete("/sumber/:uuid_sumber", sumberCtrl.deleteSumber);

module.exports = router;
