const router = require("express").Router();
const jurnalCtrl = require("../controllers/jurnal.controller");

router.post("/jurnal", jurnalCtrl.postJurnal);

router.get("/jurnal", jurnalCtrl.getJurnal);
router.get("/jurnal/:waktu", jurnalCtrl.getJurnalByDate);

router.put("/jurnal/:uuid_jurnal", jurnalCtrl.putJurnal);
router.delete("/jurnal/:uuid_jurnal", jurnalCtrl.deleteJurnal);

module.exports = router;
