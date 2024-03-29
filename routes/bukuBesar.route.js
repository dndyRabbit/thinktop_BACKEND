const router = require("express").Router();
const bukuBesarCtrl = require("../controllers/bukuBesar.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get(
  "/buku_besar/:uuid_akun/:year",
  authMiddleware.isLoggedIn,
  bukuBesarCtrl.getAkunData
);
router.get(
  "/detail_buku_besar/:uuid_akun/:waktu",
  authMiddleware.isLoggedIn,
  bukuBesarCtrl.getAkunDataByDate
);

module.exports = router;
