"user strict";
const express = require("express");
const jwt = require("jsonwebtoken");
const chatRouter = express.Router();
const chatController = require("../src/controller/chatController");
const appSeckertKey = require("../src/config/appConfig").secret;
model = require("../models/index");

chatRouter.use(function (req, res, next) {
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token)
    return res
      .status(403)
      .json({ success: false, message: "No token provided." });

  jwt.verify(token, appSeckertKey, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: "Failed to authenticate token." });
    } else {
      req.decoded = decoded;
      next();
    }
  });
});

chatRouter.post("/users", chatController.getUsersWithLatestMessages);
chatRouter.post("/messages", chatController.sendMessage);
chatRouter.get("/chat/:id", chatController.getChat);
chatRouter.post("/group-messages", chatController.sendGroupMessages);
chatRouter.post("/mymessages/:id", chatController.getMyMessages);

module.exports = chatRouter;
