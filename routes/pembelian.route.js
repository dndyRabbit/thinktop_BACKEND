const router = require("express").Router();
const pembelianCtrl = require("../controllers/pembelian.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post(
  "/pembelian",
  authMiddleware.isLoggedIn,
  pembelianCtrl.postPembelian
);

module.exports = router;
