const mongose = require("mongoose");

const connectDB = mongose
  .connect(process.env.MONGO_DB_URI)
  .then(() => console.log("connected DB"))
  .catch((err) => {
    console.error("db error", err);
  });

module.exports = connectDB;
