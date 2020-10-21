module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const { con_Goods } = require("../controller/goods/goods");

  router.post("/goods", con_Goods);

  app.use("/api", router);
};
