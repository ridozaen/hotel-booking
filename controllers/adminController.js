const { User } = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
  createAdmin: (req, res) => {
    const { fullName, username, password } = req.body;
    User.create({
      fullName,
      username,
      password,
      role: "admin"
    })
      .then(admin => {
        res.status(201).json({ message: "Admin created Successfully", admin });
      })
      .catch(error => {
        res.status(400).json({ message: "Admin fail to created", error });
      });
  },
  signInAdmin: (req, res) => {
    const { username, password } = req.body;
    User.findOne({
      where: { username }
    })
      .then(admin => {
        if (admin) {
          let checkPassword = admin.matchPassword(password);
          if (checkPassword) {
            let token = jwt.sign(
              {
                id: admin.id,
                username: admin.username,
                role: admin.role
              },
              process.env.SECRET_KEY
            );
            res.status(200).json({ message: "successfully login", token });
          } else {
            res.status(400).json({ message: "invalid password" });
          }
        } else {
          res.status(404).json({ message: "Admin not found" });
        }
      })
      .catch(function(err) {
        res.status(400).json({ message: err.message });
      });
  }
};
