// créer un nouveau utilisateur
const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.post("/register", authController.signUp);

// export
module.exports = router;
