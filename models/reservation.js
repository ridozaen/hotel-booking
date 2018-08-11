"use strict";

module.exports = (sequelize, DataTypes) => {
  var Reservation = sequelize.define(
    "Reservation",
    {
      checkInDate: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: {
            args: true,
            msg: "check in Date is Required"
          }
        }
      },
      checkOutDate: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: {
            args: true,
            msg: "check out Date is Required"
          }
        }
      },
      numberOfRooms: {
        type: DataTypes.INTEGER
      },
      roomId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    },
    {}
  );
  Reservation.associate = function(models) {
    // associations can be defined here
    Reservation.belongsTo(models.User, { foreignKey: "userId" });
    Reservation.belongsTo(models.Room, { foreignKey: "roomId" });
  };
  //checkAvailability
  Reservation.checkAvailability = (startDate, endDate, roomId, Room) => {
    return Reservation.findAll({
      raw: true,
      where: {
        $or: [
          {
            checkInDate: {
              $between: [startDate, endDate]
            }
          },
          {
            checkOutDate: {
              $between: [startDate, endDate]
            }
          }
        ],
        roomId
      },
      attributes: [
        [sequelize.col("roomId"), "roomId"],
        [sequelize.col("Room.quantity"), "qty"],
        [sequelize.fn("sum", sequelize.col("numberOfRooms")), "booked"],
        [sequelize.literal('(quantity -  sum("numberOfRooms"))'), "available"]
      ],
      include: [Room],
      group: ["roomId", "Room.id"]
    });
  };
  return Reservation;
};
