const express = require("express");
require("dotenv").config();
const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");
const roomRouter = require("./routes/rooms");

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
app.use("/rooms", roomRouter);

app.listen(port, function() {
  console.log(`server running on port ${port}`);
});
