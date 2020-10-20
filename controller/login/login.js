// 登陆
const Con = require("../../db/mysql");
const { isExistence } = require("../../utils/mysql/index.js");
const handleRes = require("../../utils/others/res.js");

const con_Login = async (req, res) => {
  let { user, password } = req.body;
  if (!user || !password) {
    return res.send(handleRes("登陆失败,请校验信息", 1001));
  }
  let bol = await isExistence("user", { user, password });
  if (!bol) {
    res.send(handleRes("登陆失败,用户名或密码不正确", 1002));
  } else {
    res.send(handleRes("登陆成功", 1000));
  }
};

module.exports = { con_Login };
