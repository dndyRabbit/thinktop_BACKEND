const router = require("express").Router();
const neracaSaldoCtrl = require("../controllers/neracaSaldo.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get(
  "/neraca_saldo/:year",
  authMiddleware.isLoggedIn,
  neracaSaldoCtrl.getNeracaSaldoDate
);
router.get(
  "/detail_neraca_saldo/:waktu",
  authMiddleware.isLoggedIn,
  neracaSaldoCtrl.getDetailNeracaSaldo
);

module.exports = router;
