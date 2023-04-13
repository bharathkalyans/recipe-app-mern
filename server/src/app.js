const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const userRouter = require("./routes/users.js");
const recipesRouter = require("./routes/recipes.js");

require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);

app.use("/recipes", recipesRouter);

mongoose.connect(
  `mongodb+srv://bharathkalyans:${process.env.MONGODB_PWD}@recipes.orv6t0h.mongodb.net/recipes?retryWrites=true&w=majority`
);

app.listen(PORT, () => {
  console.log(`Server is started at PORT : ${PORT}`);
});
