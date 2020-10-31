module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const {
    con_Nav,
    con_addNav,
    con_deleteNav,
    con_editNav,
  } = require("../../controller/system/nav");
  const { verify } = require("../../controller/jwt/jwt");
  router.post("/nav", con_Nav);
  // 新增
  router.post("/addNav", verify, con_addNav);
  // 删除
  router.post("/deleteNav", verify, con_deleteNav);
  // 修改
  router.post("/editNav", verify, con_editNav);

  app.use("/api/admin", router);
};
