const e = require("express");

const emailIsValid = (email) => {
    if(!email.includes("@")) throw new Error("Invalid Email check @");
    else if(!/\.com$/i.test(email)) throw new Error("Invalid Email check .com must be at the last");
};
const phoneIsValid = (phone) => {
  if (!(phone.length >= 10))
    throw new Error("Phone no. not contains minimum 10 digits");
  else if (/\D/.test(phone))
    throw new Error("Phone no. not contains only digits");
};
const passwordIsValid = (password) => {
  if (password.length < 8) throw new Error("Password is too short");
  else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
    throw new Error("Password doesn't contain special characters");
  else if (!/[A-Z]/.test(password))
    throw new Error("Password doesn't contain Capital letters");
  else if (!/\d/) throw new Error("Password doesn't contain numbers");
};
const nameIsValid = (fName, lName) => {
  if (/[A-Z]/.test(fName.slice(1)))
    throw new Error("only First latter should be capital in fName");
  if (/[A-Z]/.test(lName.slice(1)))
    throw new Error("only First latter should be capital in lName");
  if (!/[A-Z]/.test(fName))
    throw new Error("First latter must be capital in fName");
  if (!/[A-Z]/.test(lName))
    throw new Error("First latter must be capital in lName");
};

module.exports = { emailIsValid, phoneIsValid, passwordIsValid, nameIsValid };
