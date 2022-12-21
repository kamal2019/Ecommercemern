const express = require("express");
const router = express.Router();
const { customerGuard } = require("../auth/auth");

const {
  addReview,
  getBookReviews,
  getUserReviews,
  deleteReview,
  updateReview,
} = require("../controller/reviewController");

router.route("/reviews/get/book/:productId").get(customerGuard, getBookReviews);
router.route("/review/add/:productId").post(customerGuard, addReview);
router.route("/reviews/get/user").get(customerGuard, getUserReviews);
router.route("/reviews/update/:id").put(customerGuard, updateReview);
router.route("/reviews/delete/:id").delete(customerGuard, deleteReview);

module.exports = router;
