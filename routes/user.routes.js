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
// update d'un utilisateur
router.put("/:id", userController.updateUser);
// delete d'un utilisateur
router.delete("/:id", userController.deleteUser);
// follow d'un utilisateur
router.patch("/follow/:id", userController.follow);
// unfollow d'un utilisateur
router.patch("/unfollow/:id", userController.unfollow);

// export
module.exports = router;
