const mongoose = require("mongoose");

const ReviewModel = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  productId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  reviewText: {
    type: String,
    required: true,
  },
  reviewDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Review", ReviewModel);
