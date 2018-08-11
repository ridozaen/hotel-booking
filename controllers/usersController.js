const { User } = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
  signUp: (req, res) => {
    const { fullName, username, password } = req.body;
    User.create({
      fullName,
      username,
      password,
      role: "user"
    })
      .then(user => {
        res.status(201).json({ message: "User created Successfully", user });
      })
      .catch(error => {
        res.status(400).json({ message: "User fail to created", error });
      });
  },
  signIn: (req, res) => {
    const { username, password } = req.body;
    User.findOne({
      where: { username }
    })
      .then(user => {
        if (user) {
          let checkPassword = user.matchPassword(password);
          if (checkPassword) {
            let token = jwt.sign(
              {
                id: user.id,
                username: user.username,
                role: user.role
              },
              process.env.SECRET_KEY
            );
            res.status(200).json({ message: "successfully login", token });
          } else {
            res.status(400).json({ message: "invalid user/password" });
          }
        } else {
          res.status(404).json({ message: "User not found" });
        }
      })
      .catch(function(err) {
        res.status(400).json({ message: err.message });
      });
  }
};
