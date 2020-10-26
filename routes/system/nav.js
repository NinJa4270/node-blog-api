module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const { con_Nav, con_addNav, con_deleteNav } = require("../../controller/system/nav");

  router.post("/nav", con_Nav );
  // 新增
  router.post("/addNav", con_addNav );
  // 删除
  router.post("/deleteNav", con_deleteNav );

  app.use("/api", router);
};
