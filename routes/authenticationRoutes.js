const express = require("express");
const authenticationRouter = express.Router();
const authController = require("../src/controller/authController");
const registerValidation = require("../src/validations/auth.validation");
const validate = require("../src/middlewares/validate");

authenticationRouter.post(
  "/register",
  validate(registerValidation.register),
  authController.registerUser
);
authenticationRouter.post("/login", authController.login);

module.exports = authenticationRouter;
