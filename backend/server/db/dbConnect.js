// external imports
const mongoose = require("mongoose");
require('dotenv').config()

async function dbConnect() {
  // use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
  mongoose
    .connect(
      "mongodb+srv://kaushik:1234@cluster0.9xdispc.mongodb.net/testDB2?retryWrites=true&w=majority",//"mongodb+srv://team23:team23@team23.57jtre7.mongodb.net/Speedmail?retryWrites=true&w=majority",// process.env.DB_URL,
      {
        //   these are options to ensure that the connection is done properly
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndexs: true,
      }
    )
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas ER!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });
}

module.exports = dbConnect;