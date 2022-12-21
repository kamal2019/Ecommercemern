const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Customer = require("../model/customerModel");

const registerUser = async (req, res) => {
  const { fullName, email, password, phoneNo, age } = req.body;
  try {
    if (!fullName || !email || !password || !phoneNo || !age) {
      throw new Error("All of the fields are required.");
    }

    const emailExists = await Customer.findOne({ email });

    if (emailExists) {
      // If email already exists, this block will get executed.
      throw new Error("Email already exists.");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const customerData = await Customer.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNo,
      age,
    });

    if (customerData) {
      res.json({ message: "User created successfully!", customerData });
    }
  } catch (err) {
    res.json({ errorMessage: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      res.json("All fields are required");
    }

    const customer = await Customer.findOne({ email });
    if (customer && (await bcrypt.compare(password, customer.password))) {
      res.status(200);
      res.json({
        success: true,
        token: generateToken(customer._id),
      });
    } else {
      res.status(200);
      res.json("Invalid credentials");
    }
  } catch (err) {
    res.json({ errorMessage: err.message, stack: err.stack });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

module.exports = {
  registerUser,
  loginUser,
};
