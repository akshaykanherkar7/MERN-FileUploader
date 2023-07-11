const User = require("../Models/ImageModel");

const uploadImage = async (req, res) => {
    console.log("Inside uploadImage Function");
  const name = req.body.name;
  const birthdate = req.body.birthdate;
  const photo = req.file.filename;

  const newUserData = {
    name,
    birthdate,
    photo,
  };

  const newUser = new User(newUserData);

  newUser
    .save()
    .then(() => res.json("User Added"))
    .catch((err) => res.status(400).json("Error", err));
};

const getAllUsers = async (req, res) => {
    User.find()
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json('Error', err));
}

module.exports = {
  uploadImage,
  getAllUsers
};
