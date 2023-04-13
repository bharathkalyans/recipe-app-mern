const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/Users");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username: username });
    if (user) {
      return res.send({ message: "Username already exists!! 🙂!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.send({ message: "User registered Successfully!!" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      res.send({ message: "User doesn't Exist!" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.send({ message: "Invalid Username or Password!" });
    }

    const token = jwt.sign({ id: user._id }, "secret");
    res.send({ token, userID: user._id });
  } catch (error) {
    console.log(error);
  }
});

router.get("/", (req, res) => {
  res.send("Auth Sucessfull");
});

module.exports = router;
