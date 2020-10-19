module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const { con_register } = require("../controller/login/register.js");
  const { getcode } = require("../controller/login/nodemailer");
  router.get("/test", (req, res) => {
    console.log("连接成功");
    res.send("连接成功");
  });
  router.post("/nodemailer", getcode);

  router.post("/register", con_register);

  app.use("/api", router);
};
