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
      return res.status(409).send({ message: "Username already exists!! 🙂!" });
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
      res.status(401).send({ message: "User doesn't Exist!" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid Username or Password!" });
    }

    const token = jwt.sign({ id: user._id }, "secret");
    res.send({ token, userID: user._id });
  } catch (error) {
    console.log(error);
  }
});

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "secret", (err) => {
      if (err) res.sendStatus(403);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports.authRouter = router;
module.exports.verifyToken = verifyToken;
