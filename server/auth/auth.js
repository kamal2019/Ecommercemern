const jwt = require("jsonwebtoken");
const Customer = require("../model/customerModel");

const customerGuard = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error("No any token value");

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      res.status(401);
      throw new Error("Not Authorized, No Token");
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData) return;

    req.customer = await Customer.findById(decodedData.id);

    next();
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports = { customerGuard };
