module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const { verify } = require("../controller/jwt/jwt");
  const {
    con_articleList,
    con_addArticle,
    con_deleteArticle,
    con_editArticle,
  } = require("../controller/articles/articles");

  router.post("/articleList", verify, con_articleList);
  router.post("/addArticle", verify, con_addArticle);
  router.post("/deleteArticle", verify, con_deleteArticle);
  router.post("/editArticle", verify, con_editArticle);

  app.use("/api", router);
};
