const mongoose = require("mongoose");

const ProductModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  writerName: {
    type: String,
    required: true,
  },
  publicationName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Date,
    required: true,
  },
  customerId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductModel);
