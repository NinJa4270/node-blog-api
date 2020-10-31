module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const { verify } = require("../controller/jwt/jwt");
  const {
    con_art,
    con_addArt,
    con_deleteArt,
    con_editArt,
  } = require("../controller/categories/articleCategories");

  router.post("/artList", verify, con_art);
  router.post("/addArt", verify, con_addArt);
  router.post("/deleteArt", verify, con_deleteArt);
  router.post("/editArt", verify, con_editArt);

  app.use("/api/admin", router);
};
