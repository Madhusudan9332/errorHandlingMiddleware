const express = require("express");
const mongoose = require("mongoose");
const validation = require("./controller/user.js");
const userModel = require("./model/user.js");


mongoose
  .connect("mongodb+srv://madhusudangautam003:WOPPGoZfCQ5ihZdD@cluster0.ixl5ds3.mongodb.net/")
  .then(() => console.log("Databse connected successfully"))
  .catch((err) => console.log("Error connecting to database", err));

const app = express();
const router = express.Router();
app.use(express.json());

const errorHnadler = async (req, res, next) => {
  const { fName, lName, email, phone, password } = req.body;
  try {
    validation.nameIsValid(fName, lName);
    validation.emailIsValid(email);
    validation.passwordIsValid(password);
    validation.phoneIsValid(phone);
    next();
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
    next(err.message);
  }
};
router.post("/user",errorHnadler,(req,res)=>{
  const response = (async()=>await userModel.create(req.body))();
  res.status(200).json({
    message: "success",
    response,
  });
});
app.use(router);


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
