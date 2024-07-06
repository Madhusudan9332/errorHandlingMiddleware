const express = require("express");
const mongoose = require("mongoose");
const validation = require("./controller/user.js");
const userModel = require("./model/user.js");

mongoose
  .connect("mongodb://localhost:27017/user_app")
  .then(() => console.log("Databse connected successfully"))
  .catch((err) => console.log("Error connecting to database", err));

const app = express();
const router = express.Router();
app.use(express.json());

let data = {};
router.post("/user", (req, res, next) => {
  data = req.body;
  next();
});
app.use(router);

const errorHnadler = async (req, res, next) => {
  const { fName, lName, email, phone, password } = data;
  try {
    validation.nameIsValid(fName, lName);
    validation.emailIsValid(email);
    validation.passwordIsValid(password);
    validation.phoneIsValid(phone);
    const response = await userModel.create(data);
    res.status(200).json({
      message: "success",
      response,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
    next(err.message);
  }
};
app.use(errorHnadler);

app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "success",
    addUser: "http://localhost:3300/user",
  });
});

const port = 3300;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
