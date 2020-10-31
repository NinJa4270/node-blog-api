module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const {
    con_User,
    con_addUser,
    con_deleteUser,
    con_editUser,
  } = require("../controller/users/users");
  const { verify } = require("../controller/jwt/jwt");

  router.post("/userList", verify, con_User);
  router.post("/addUser", verify, con_addUser);
  router.post("/deleteUser", verify, con_deleteUser);
  router.post("/editUser", verify, con_editUser);

  app.use("/api/admin", router);
};
