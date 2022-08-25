const router = require("express").Router();
const pemasukanCtrl = require("../controllers/pemasukan.controller");

router.post("/pemasukan", pemasukanCtrl.postPemasukan);

router.get("/pemasukan", pemasukanCtrl.getPemasukan);
router.put("/pemasukan/:uuid_pemasukan", pemasukanCtrl.putPemasukan);
router.delete("/pemasukan/:uuid_pemasukan", pemasukanCtrl.deletePemasukan);

module.exports = router;
