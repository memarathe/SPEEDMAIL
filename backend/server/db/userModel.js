const mongoose = require("mongoose");

// user schema
const UserSchema = new mongoose.Schema({
  // email field
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },
  //   password field
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },
  firstname: {
    type: String,
    required: [true, "Please provide a firstname!"],
    unique: false,
  },
  lastname: {
    type: String,
    required: [true, "Please provide a lastname!"],
    unique: false,
  },
  phone: {
    type: String,
    required: [true, "Please provide a number!"],
    unique: false,
  },
  user_type: {
    type: String,
    required: [true, "Please provide an valid usertype!"],
    unique: false,
  },
  security_question: {
    type: String,
    required: [true, "Please select an Question!"],
    unique: false,
  },
  security_answer: {
    type: String,
    required: [true, "Please provide an answer!"],
    unique: false,
  },
  secret: { type: String, required: true },
});

// export UserSchema
module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
