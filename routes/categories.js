module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const {
    con_articleCategories,
  } = require("../controller/categories/articleCategories");

  router.post("/articleCategories", con_articleCategories);

  app.use("/api", router);
};
