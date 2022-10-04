const router = require("express").Router();
const karyawanCtrl = require("../controllers/karyawan.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post(
  "/karyawan",
  authMiddleware.isAdminLoggedIn,
  karyawanCtrl.postKaryawan
);

router.get("/karyawan", authMiddleware.isLoggedIn, karyawanCtrl.getKaryawan);

router.put(
  "/karyawan/:uuid_karyawan",
  authMiddleware.isLoggedIn,
  karyawanCtrl.putKaryawan
);
router.delete(
  "/karyawan/:uuid_karyawan",
  authMiddleware.isLoggedIn,
  karyawanCtrl.deleteKaryawan
);

module.exports = router;
