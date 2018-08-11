const { Room } = require("../models");
const { Reservation } = require("../models");
const models = require("../models");
const {
  convertStringToDate,
  timeCheckIn,
  timeCheckOut
} = require("../helpers/helpers");

module.exports = {
  findAvailRoom: async (req, res) => {
    let { checkInDate, checkOutDate } = req.query;
    checkInDate = new Date(
      convertStringToDate(checkInDate) + " " + timeCheckIn
    );
    checkOutDate = new Date(
      convertStringToDate(checkOutDate) + " " + timeCheckOut
    );

    let rooms = await Room.findAll({
      raw: true
    });
    if (rooms.length === 0) {
      res.status(400).json({
        message: "Room not available",
        rooms
      });
    }
    let newRooms = [];
    for (i = 0; i < rooms.length; i++) {
      let roomAvail = await Reservation.checkAvailability(
        checkInDate,
        checkOutDate,
        rooms[i].id,
        Room
      );
      if (roomAvail.length === 0 || roomAvail[0].available > 0) {
        if (roomAvail.length !== 0) {
          rooms[i].available = roomAvail[0].available;
        } else {
          rooms[i].available = rooms[i].quantity;
        }
        newRooms.push(rooms[i]);
      }
    }
    res.status(200).json(newRooms);
  },
  findAll: (req, res) => {
    Room.findAll()
      .then(rooms => {
        if (rooms.length !== 0) {
          res.status(200).json({ message: "retrieve rooms success", rooms });
        } else {
          res.status(404).json({ message: "rooms is empty" });
        }
      })
      .catch(error => {
        res.status(400).json({ message: "failed to get rooms", error });
      });
  },
  findById: (req, res) => {
    const id = req.params.id;
    Room.findById(id)
      .then(room => {
        if (room) {
          res.status(200).json({ message: "get room success", room });
        } else {
          res.status(404).json({ message: "room is not found" });
        }
      })
      .catch(error => {
        res.status(400).json({ message: "get room failed", error });
      });
  },
  createRoom: (req, res) => {
    const { type, description, quantity, price } = req.body;
    if (req.file && req.file.cloudStoragePublicUrl) {
      image = req.file.cloudStoragePublicUrl;
    } else {
      image = null;
    }

    Room.create({
      type,
      description,
      image,
      quantity,
      price
    })
      .then(room => {
        res.status(201).json({ message: "create room success", room });
      })
      .catch(error => {
        res.status(400).json({ message: "create room fail", error });
      });
  },
  updateRoom: (req, res) => {
    const obj = req.body;
    const room = {};
    const id = req.params.id;
    Object.keys(req.body).forEach(key => {
      if (obj[key].trim()) room[key] = obj[key];
    });
    // if req.file undefined let skip the image updated
    if (req.file && req.file.cloudStoragePublicUrl) {
      room.image = req.file.cloudStoragePublicUrl;
    }
    console.log(room);
    Room.update(room, { where: { id } })
      .then(room => {
        res.status(200).json({ message: "room updated successfully", room });
      })
      .catch(error => {
        res.status(400).json({ message: "room update filed", error });
      });
  },
  deleteRoom: (req, res) => {
    const id = req.params.id;
    Room.destroy({ where: { id } })
      .then(() => {
        res.status(200).json({ message: "delete room success" });
      })
      .catch(error => {
        res.status(400).json({ message: "delete room failed" });
      });
  }
};
