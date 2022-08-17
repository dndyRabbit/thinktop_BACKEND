const router = require("express").Router();
const authCtrl = require("../controllers/auth.controller");

router.post("/register", authCtrl.register);

router.post("/login", authCtrl.login);

router.put("/reset_password", authCtrl.reset_password);

router.post("/refresh_token", authCtrl.generateAccessToken);

module.exports = router;
