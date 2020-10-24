module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const { con_Nav } = require("../../controller/system/nav");

  router.post("/nav", con_Nav );

  app.use("/api", router);
};
