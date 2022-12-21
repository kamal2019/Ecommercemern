const Review = require("../model/reviewModel");
const Customer = require("../model/customerModel");

const addReview = async (req, res) => {
  const userId = req.customer._id;
  const { productId } = req.params;

  try {
    if (!userId) throw new Error("No user found.");
    if (!productId) throw new Error("No product found.");

    const { reviewText, reviewDate } = req.body;

    if (!reviewText || !reviewDate)
      throw new Error("All fields must be filled.");

    const reviewData = await Review.create({
      userId,
      productId,
      reviewText,
      reviewDate,
    });

    res.json({ reviewData });
  } catch (err) {
    res.json({ errorMessage: err.message });
  }
};

const getBookReviews = async (req, res) => {
  const { productId } = req.params;

  try {
    if (!productId) throw new Error("No product found.");

    const data = await Review.find({ productId });

    const requiredData = [];

    data.forEach(async (bookData, i) => {
      const customerData = await Customer.findById(bookData.userId);

      requiredData.push({
        customerName: customerData.fullName,
        reviewText: bookData.reviewText,
        reviewDate: bookData.reviewDate,
      });

      if (i === data.length - 1) {
        res.json({ data: requiredData });
      }
    });
  } catch (err) {
    res.json({ errorMessage: err.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    const reviewData = await Review.findById(reviewId);

    if (!reviewData) {
      res.status(400);
      throw new Error("No review found");
    }
    const customer = await Customer.findById(req.customer._id);

    if (!customer) {
      res.status(400);
      throw new Error("User not found");
    }

    if (reviewData.userId.toString() !== customer.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const updatedReview = await Review.findByIdAndUpdate(reviewId, req.body, {
      new: true,
    });

    res.status(200).json(updatedReview);
  } catch (err) {
    res.json({ error: err.message });
  }
};
const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    const reviewData = await Review.findById(reviewId);

    if (!reviewData) {
      res.status(400);
      throw new Error("No review found");
    }
    const customer = await Customer.findById(req.customer._id);

    if (!customer) {
      res.status(400);
      throw new Error("User not found");
    }

    if (reviewData.userId.toString() !== customer.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json(reviewId);
  } catch (err) {
    res.json({ error: err.message });
  }
};
const getUserReviews = async (req, res) => {
  const customerId = req.customer._id;
  try {
    if (!customerId) throw new Error("User not authorized.");

    const data = await Review.find({ customerId });

    res.json({ data });
  } catch (err) {
    res.json({ errorMessage: err.message });
  }
};

module.exports = {
  addReview,
  getBookReviews,
  getUserReviews,
  deleteReview,
  updateReview,
};
