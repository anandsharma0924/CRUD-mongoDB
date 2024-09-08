const mongoose = require("mongoose");

const createModelSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true

  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long"],
  },
});

module.exports = mongoose.model("test_data", createModelSchema);
