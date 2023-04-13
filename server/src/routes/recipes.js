const express = require("express");
const mongoose = require("mongoose");
const RecipeModel = require("../models/Recipes");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    res.status(200).json(response);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", async (req, res) => {
  const recipe = new RecipeModel(req.body);
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
