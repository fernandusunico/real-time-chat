"use strict";
const authenticationRouter = require("./authenticationRoutes");
const chatRouter = require("./chatRoutes");
const groupRouter = require("./groupRoutes");

module.exports = function ConfigApiRoutes(app) {
  // app.use(cors());
  app.use("/api", authenticationRouter);
  app.use("/api", chatRouter);
  app.use("/api", groupRouter);

  app.get("/", (req, res) => {
    res.render("login");
  });

  app.get("/chat", (req, res) => {
    res.render("chat");
  });
};
