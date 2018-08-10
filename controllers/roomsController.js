const { Room } = require("../models");

module.exports = {
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
  createRooms: (req, res) => {
    const { type, description, quantity, price } = req.body;
    let image = req.file.cloudStoragePublicUrl;
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
  }
};
