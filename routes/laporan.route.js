const router = require("express").Router();
const laporanCtrl = require("../controllers/laporan.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get(
  "/laporan-harian/:waktu",
  authMiddleware.isLoggedIn,
  laporanCtrl.getLaporanHarianWaktu
);
router.get(
  "/laporan-harian-data/:waktu",
  authMiddleware.isLoggedIn,
  laporanCtrl.getLaporanHarianData
);

router.get(
  "/laporan-bulanan/:year",
  authMiddleware.isLoggedIn,
  laporanCtrl.getLaporanBulananWaktu
);

router.get(
  "/laporan-bulanan-data/:waktu",
  authMiddleware.isLoggedIn,
  laporanCtrl.getLaporanBulananData
);

router.get(
  "/laporan-tahunan",
  authMiddleware.isLoggedIn,
  laporanCtrl.getLaporanTahunanWaktu
);

router.get(
  "/laporan-tahunan-data/:waktu",
  authMiddleware.isLoggedIn,
  laporanCtrl.getLaporanTahunanData
);

router.get(
  "/laporan-laba/",
  authMiddleware.isLoggedIn,
  laporanCtrl.getLaporanLabaRugi
);

module.exports = router;
