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
  },
  getUsers: (req, res) => {
    User.findAll()
      .then(function(users) {
        if (users) {
          res.status(200).json({ message: "retrieve users success", users });
        } else {
          res.status(404).json({ message: "failed to get users" });
        }
      })
      .catch(function(err) {
        res.status(400).json({ message: "failed to get users" });
      });
  },
  getUserById: (req, res) => {
    let id = req.params.id;
    User.findById(id)
      .then(function(user) {
        if (user) {
          res.status(200).json({ message: "get user success", user });
        } else {
          res.status(404).json({ message: "failed to get user" });
        }
      })
      .catch(function(err) {
        res.status(400).json({ message: "failed to get user" });
      });
  },
  deleteUserById: (req, res) => {
    let id = req.params.id;
    User.destroy({ where: { id } })
      .then(changes => {
        res.status(200).json({ message: "delete success", changes });
      })
      .catch(error => {
        res.status(400).json({ message: "failed to delete user", error });
      });
  }
};
