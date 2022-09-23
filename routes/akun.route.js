const router = require("express").Router();
const akunCtrl = require("../controllers/akun.controller");

router.post("/akun", akunCtrl.postAkun);

router.get("/akun", akunCtrl.getAkun);
router.put("/akun/:uuid_akun", akunCtrl.putAkun);
router.delete("/akun/:uuid_akun", akunCtrl.deleteAkun);

module.exports = router;
