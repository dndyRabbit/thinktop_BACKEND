const router = require("express").Router();
const akunCtrl = require("../controllers/akun.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/akun", authMiddleware.isAdminLoggedIn, akunCtrl.postAkun);

router.get("/akun", authMiddleware.isLoggedIn, akunCtrl.getAkun);

router.put(
  "/akun/:uuid_akun",
  authMiddleware.isAdminLoggedIn,
  akunCtrl.putAkun
);
router.delete(
  "/akun/:uuid_akun",
  authMiddleware.isAdminLoggedIn,
  akunCtrl.deleteAkun
);

module.exports = router;
