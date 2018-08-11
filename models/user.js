"use strict";
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    "User",
    {
      fullName: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "username is required"
          },
          async isUsernameUnique(username) {
            const user = await User.findOne({ where: { username } });
            if (user && +this.id !== user.id) {
              throw new Error("Username already exist!");
            }
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "password is required"
          }
        }
      },
      role: DataTypes.STRING
    },
    {
      hooks: {
        beforeCreate(user, options) {
          const salt = 7;
          const plainPassword = user.password;
          const hash = bcrypt.hashSync(plainPassword, salt);
          user.password = hash;
        }
      }
    }
  );
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Reservation, { foreignKey: "userId" });
  };
  User.prototype.matchPassword = function(passwordText) {
    return bcrypt.compareSync(passwordText, this.password);
  };
  return User;
};
