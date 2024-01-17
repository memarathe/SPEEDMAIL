const mongoose = require("mongoose");
const ServiceSchema = new mongoose.Schema({
  // sender's name
  service_name: {
    type: String,
    required: [true, "Please provide your serivce!"],
    unique: true,
  },
  
});

// export UserSchema
module.exports = mongoose.model.services || mongoose.model("services", ServiceSchema);
