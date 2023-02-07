const router = require("express").Router();
const pembelianCtrl = require("../controllers/pembelian.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post(
  "/pembelian",
  authMiddleware.isLoggedIn,
  pembelianCtrl.postPembelian
);

router.get(
  "/pembelian",
  authMiddleware.isLoggedIn,
  pembelianCtrl.getPembelian
);

router.put(
  "/pembelian/:uuid_pembelian",
  authMiddleware.isLoggedIn,
  pembelianCtrl.putPembelian
)

module.exports = router;
