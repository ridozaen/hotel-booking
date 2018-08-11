"use strict";
module.exports = (sequelize, DataTypes) => {
  var Room = sequelize.define(
    "Room",
    {
      type: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "type room is required"
          }
        }
      },
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      price: DataTypes.DECIMAL
    },
    {}
  );
  Room.associate = function(models) {
    // associations can be defined here
    Room.hasMany(models.Reservation, { foreignKey: "roomId" });
  };
  return Room;
};
