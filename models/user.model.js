const mongoose = require("mongoose");
// controle si l'adresse email est valide
const { isEmail } = require("validator");

// schéma d'utilisateur
const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 55,
      unique: true,
      // supprimer les espaces
      trim: true,
    },
    email: {
      type: String,
      required: true,
      // vérifier si l'email est valide
      validate: [isEmail],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
    picture: {
      type: String,
      default: "./uploads/profil/random-user.png",
    },
    bio: {
      type: String,
      max: 1024,
    },
    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    likes: {
      type: [String],
    },
  },
  { timestamps: true }
);

// exporter le schema en tant que modèle
const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
