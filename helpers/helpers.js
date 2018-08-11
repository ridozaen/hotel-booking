const moment = require("moment");
exports.convertStringToDate = string => {
  return string.replace(/(\d{2})(\d{2})(\d{4})/, "$2/$1/$3");
};

exports.dateToString = date => {
  return moment(date).format("DDMMYYYY");
};

exports.timeCheckIn = "13:00:00";
exports.timeCheckOut = "12:00:00";
