const Product = require("../model/productModel");
const Cart = require("../model/cartModel");

const getCart = async (req, res) => {
  try {
    const userId = req.customer._id;

    if (!userId) throw new Error("No user found!");

    const cartData = await Cart.find({ userId });

    if (cartData) res.json({ data: cartData });
    else throw new Error("Error while getting cart details!");
  } catch (err) {
    res.json({ errorMessage: err.message });
  }
};

const addCart = async (req, res) => {
  try {
    const userId = req.customer._id;
    const productId = req.params.productId;
    const quantity = req.body.quantity;

    if (!userId) throw new Error("No user found!");
    if (!productId) throw new Error("No any product found!");
    if (!quantity) throw new Error("Please fill all the fields!");

    // const authorizedUser = await Product.find({ userId });

    // if (!authorizedUser) throw new Error("User not authorized!");

    const { price: unitPrice, name: productName } = await Product.findById(
      productId
    );

    const total = +quantity * +unitPrice;

    const data = await Cart.create({
      userId,
      productId,
      quantity,
      total,
      productName,
    });

    if (data) res.json({ message: "Cart added successfully!", data });
    else throw new Error("Cart addition failed!");
  } catch (err) {
    res.json({ errorMessage: err.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const userId = req.customer._id;
    const { cartId } = req.params;
    const { quantity } = req.body;

    if (!userId) throw new Error("No user found!");
    if (!cartId) throw new Error("No any cart found!");
    if (!quantity) throw new Error("Mo any value for quantity to update!");

    const authorizedUser = await Cart.find({ userId });

    if (!authorizedUser) throw new Error("User not authorized!");

    const { productId } = await Cart.findById(cartId);

    const { price: unitPrice } = await Product.findById(productId);

    const total = +quantity * +unitPrice;

    const data = await Cart.findByIdAndUpdate(
      cartId,
      { total, quantity },
      { new: true }
    );

    if (data)
      res.json({ message: "Cart update successful!", updatedData: data });
    else throw new Error("Error while updating!");
  } catch (err) {
    res.json({ errorMessage: err.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const userId = req.customer._id;
    const { cartId } = req.params;

    if (!userId) throw new Error("No user found!");
    if (!cartId) throw new Error("No any cart found!");

    const authorizedUser = await Cart.find({ userId });

    if (!authorizedUser) throw new Error("User not authorized!");

    const data = await Cart.findByIdAndDelete(cartId);

    if (data) res.json({ message: "Cart deleted successfuly!", id: cartId });
    else throw new Error("Error while deleting!");
  } catch (err) {
    res.json({ errorMessage: err.message });
  }
};

module.exports = { getCart, addCart, updateCart, deleteCart };
