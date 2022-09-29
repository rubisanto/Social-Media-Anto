// créer un nouveau utilisateur
const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

// auth
router.post("/register", authController.signUp);

//user DB
router.get("/", userController.getAllUsers);
// info d'un utilisateur
router.get("/:id", userController.userInfo);

// export
module.exports = router;
