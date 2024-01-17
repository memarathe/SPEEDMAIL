const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  // sender's name
  sender_name: {
    type: String,
    required: [true, "Please provide your name!"],
    unique: false,
  },
  //   password field
  receiver_name: {
    type: String,
    required: [true, "Please provide receiver's name!"],
    unique: false,
  },
  length_of_pkg: {
    type: String,
    required: [true, "Please provide a valid number!"],
    unique: false,
  },
  width_of_pkg: {
    type: String,
    required: [true, "Please provide a valid number!"],
    unique: false,
  },
  sender_phone: {
    type: String,
    required: [true, "Please provide a number!"],
    unique: false,
  },
  receiver_phone: {
    type: String,
    required: [true, "Please provide an valid number!"],
    unique: false,
  },
  sender_adr: {
    type: String,
    required: [true, "Please provide a valid address!"],
    unique: false,
  },
  receiver_adr: {
    type: String,
    required: [true, "Please provide an valid address!"],
    unique: false,
  },
  service_used: {
    type: String,
    required: [true, "Please provide a servicename!"],
    unique: false,
  },
  delivery_date: {
    type: String,
    required: [true, "Please provide an valid date!"],
    unique: false,
  },
  amount: {
    type: String,
    required: [true, "Please provide a valid amount!"],
    unique: false,
  },
  driver_id: {
    type: String,
    required: [true, "Please provide an valid id!"],
    unique: false,
  },
  order_status: {
    type: String,
    required: [true, "Please provide an valid value!"],
    unique: false,
  },
  sender_email: {
    type: String,
    required: [true, "Please provide a valiid email!"],
    unique: false,
  }
});

module.exports = mongoose.model.orders || mongoose.model("orders", OrderSchema);          