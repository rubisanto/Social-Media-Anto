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

// export la suppression d'un utilisateur
module.exports.deleteUser = async (req, res) => {
  // si l'id est valide
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);

  try {
    // si l'id est valide
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Utilisateur supprimé" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    // add to the follower list
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true },
      (err, docs) => {
        // if (!err) res.status(201).json(docs);
        // if (err) return res.status(400).jsos(err);
      }
      // pour le moment : utilisation du then, message d'erreur mais fonctionne en bdd
    ).then(
      UserModel.findByIdAndUpdate(
        req.body.idToFollow,
        { $addToSet: { followers: req.params.id } },
        { new: true, upsert: true },
        (err, docs) => {
          if (!err) res.status(201).json(docs);
          // if (err) return res.status(400).json(err);
        }
      )
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// export le unfollow d'un utilisateur
module.exports.unfollow = async (req, res) => {
  // si l'id est valide
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);

  // si l'id est valide
  try {
    // retirer de la liste des followers
    await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { followers: req.body.id },
      },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    );
    // retirer de la liste des followings
    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { followings: req.params.id },
      },
      { new: true, upsert: true },
      (err, docs) => {
        if (err) return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
