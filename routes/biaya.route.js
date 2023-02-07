const router = require("express").Router();
const biayaCtrl = require("../controllers/biaya.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/biaya", authMiddleware.isLoggedIn, biayaCtrl.postBiaya);
router.get("/biaya", authMiddleware.isLoggedIn, biayaCtrl.getBiaya);

module.exports = router;
