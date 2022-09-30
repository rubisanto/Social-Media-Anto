const UserModel = require("../models/user.model");
// pour vérification
const ObjectID = require("mongoose").Types.ObjectId;

// export les infos de tous les utilisateurs
module.exports.getAllUsers = async (req, res) => {
  // ne pas envoyer le mot de passe - envoyer le reste des données
  const users = await UserModel.find().select("-password");
  //   status 200 = ok
  res.status(200).json(users);
};

// pour récuprérer les données en post = req.body
// pour récupérer les données en get = req.params

// export les infos d'un utilisateur précis
module.exports.userInfo = (req, res) => {
  console.log(req.params);
  // si l'id est valide
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);

  // si l'id est valide
  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID inconnu : " + err);
  }).select("-password");
};

// export la mise à jour d'un utilisateur
module.exports.updateUser = async (req, res) => {
  // si l'id est valide
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);

  try {
    // si l'id est valide
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    )
      .then((docs) => res.send(docs))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
