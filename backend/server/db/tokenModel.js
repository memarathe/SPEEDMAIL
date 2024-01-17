const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
	email: {
        type: String,
        required: [true, "Please provide an Email!"],
        ref: "user",
        unique: [true, "Email Exist"],
      },
	token: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: 3600 },
});

module.exports = mongoose.model("token", tokenSchema);
