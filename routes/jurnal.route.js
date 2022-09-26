const router = require("express").Router();
const jurnalCtrl = require("../controllers/jurnal.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/jurnal", authMiddleware.isLoggedIn, jurnalCtrl.postJurnal);

router.get("/jurnal", authMiddleware.isLoggedIn, jurnalCtrl.getJurnal);
router.get(
  "/jurnal/:waktu",
  authMiddleware.isLoggedIn,
  jurnalCtrl.getJurnalByDate
);

router.put(
  "/jurnal/:uuid_jurnal",
  authMiddleware.isLoggedIn,
  jurnalCtrl.putJurnal
);
router.delete(
  "/jurnal/:uuid_jurnal",
  authMiddleware.isLoggedIn,
  jurnalCtrl.deleteJurnal
);

module.exports = router;
