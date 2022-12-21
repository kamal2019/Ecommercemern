const express = require("express");
const router = new express.Router();

const { registerUser, loginUser } = require("../controller/customerController");

router.post("/customer/register", registerUser);
router.post("/customer/login", loginUser);

module.exports = router;
