const express = require("express");
const router = express.Router();

const { customerGuard } = require("../auth/auth");
const {
  addCart,
  getCart,
  updateCart,
  deleteCart,
} = require("../controller/cartController");

router.route("/cart/add/:productId").post(customerGuard, addCart);
router.route("/cart/getAll").get(customerGuard, getCart);
router.route("/cart/update/:cartId").put(customerGuard, updateCart);
router.route("/cart/delete/:cartId").delete(customerGuard, deleteCart);

module.exports = router;
