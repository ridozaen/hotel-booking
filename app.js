const express = require("express");
require("dotenv").config();
const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/users");
const roomRouter = require("./routes/rooms");
const reservationRouter = require("./routes/reservations");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/users", userRouter);
app.use("/rooms", roomRouter);
app.use("/reservations", reservationRouter);

app.listen(port, function() {
  console.log(`server running on port ${port}`);
});
