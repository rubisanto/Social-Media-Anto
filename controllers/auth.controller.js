const UserModel = require("../models/user.model");

// export
module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    // attendre la création
    const user = await UserModel.create({ pseudo, email, password });
    // renvoyer l'id en réponse si tout est ok
    res.status(201).json({ user: user._id });
  } catch (err) {
    res.status(200).send({ err });
  }
};
