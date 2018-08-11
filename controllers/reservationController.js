const { Reservation, Room } = require("../models");
const {
  convertStringToDate,
  timeCheckIn,
  timeCheckOut
} = require("../helpers/helpers");

module.exports = {
  booking: async (req, res) => {
    let { checkInDate, checkOutDate, numberOfRooms, roomId } = req.body;
    const userId = req.user.id;
    checkInDate = new Date(
      convertStringToDate(checkInDate) + " " + timeCheckIn
    );
    checkOutDate = new Date(
      convertStringToDate(checkOutDate) + " " + timeCheckOut
    );
    let roomAvail = await Reservation.checkAvailability(
      checkInDate,
      checkOutDate,
      roomId,
      Room
    );

    //check if room still no booking or still available
    if (roomAvail.length === 0 || roomAvail[0].available >= numberOfRooms) {
      Reservation.create({
        userId,
        roomId,
        checkInDate,
        checkOutDate,
        numberOfRooms
      })
        .then(book => {
          res.status(200).json({ message: "create booking is success", book });
        })
        .catch(error => {
          res.status(400).json({ message: "create booking is failed", error });
        });
    } else {
      res.status(400).json({ message: "Room is full!" });
    }
  },
  updateBooking: async (req, res) => {
    const id = req.params.id;
    const obj = req.body;
    const booking = {};
    const noOfBook = obj.numberOfRooms ? obj.numberOfRooms : 0;
    Object.keys(obj).forEach(key => {
      if (obj[key].trim()) booking[key] = obj[key];
    });
    // console.log(booking);
    //convert string date to Date
    if (booking.checkInDate) {
      booking.checkInDate = new Date(
        convertStringToDate(booking.checkInDate) + " " + timeCheckIn
      );
    }
    if (booking.checkOutDate) {
      booking.checkOutDate = new Date(
        convertStringToDate(booking.checkOutDate) + " " + timeCheckOut
      );
    }
    let roomAvail = [];
    if (booking.roomId) {
      roomAvail = await Reservation.checkAvailability(
        booking.checkInDate,
        booking.checkOutDate,
        booking.roomId,
        Room
      );
    }

    // read origin record booking before update
    let bookOrigin = await Reservation.findById(id);
    const changeNoBook = bookOrigin.numberOfRooms - noOfBook;

    const today = new Date();
    //check if room still no booking or still available
    if (roomAvail.length === 0 || roomAvail[0].available >= changeNoBook) {
      //can edit booking before check-in date less than today date
      if (bookOrigin.checkInDate > today) {
        Reservation.update(booking, { where: { id } })
          .then(book => {
            res.status(200).json({ message: "edit booking success", book });
          })
          .catch(error => {
            res.status(400).json({ message: "edit booking is failed", error });
          });
      } else {
        res
          .status(400)
          .json({ message: "booking cannot be edited since already check-in" });
      }
    } else {
      res.status(400).json({ message: "Room is full!" });
    }
  },
  cancelBooking: (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;
    Reservation.destroy({ where: { id, userId } })
      .then(() => {
        res.status(200).json({ message: "cancel booking success" });
      })
      .catch(error => {
        res.status(400).json({ message: "cancel booking failed" });
      });
  }
};
