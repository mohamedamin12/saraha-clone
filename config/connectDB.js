const mongoose = require('mongoose');
const url = process.env.MONGO_URI;

const connectToDB = () =>
  mongoose
    .connect(url)
    .then((conn) => console.log("database connected..."))
    .catch((err) => console.log(err));

module.exports = connectToDB;