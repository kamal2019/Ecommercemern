const mongoose = require("mongoose");

const Customer = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNo: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
});

module.exports = mongoose.model("Customer", Customer);
