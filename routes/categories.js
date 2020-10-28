module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const { con_art, con_addArt, con_deleteArt, con_editArt } = require("../controller/categories/articleCategories");

  router.post("/articleCategories", con_art);
  router.post("/addArt", con_addArt);
  router.post("/deleteArt", con_deleteArt);
  router.post("/editArt", con_editArt);

  app.use("/api", router);
};
