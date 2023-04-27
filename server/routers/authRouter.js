const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/refresh", authController.refreshAccessToken);

module.exports = router;
