const router = require("express").Router();
const bukuBesarCtrl = require("../controllers/bukuBesar.controller");

router.get("/buku_besar/:nama_akun/:year", bukuBesarCtrl.getAkunData);
router.get(
  "/detail_buku_besar/:nama_akun/:waktu",
  bukuBesarCtrl.getAkunDataByDate
);

module.exports = router;
