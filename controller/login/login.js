// 登陆
const { isExistence } = require("../../utils/mysql/index.js");
const handleRes = require("../../utils/others/res.js");
const { sqlBaseINfo, comparePassword } = require("./sql/sql_login");
const JWT = require("jsonwebtoken");
const { tokenConfig } = require("../../config/token");

const con_Login = async (req, res) => {
  let { user, password } = req.body;
  if (!user || !password) {
    return res.send(handleRes("登陆失败,请校验信息", 1001));
  }
  let bol = await isExistence("user", { user });
  if (!bol) {
    res.send(handleRes("登陆失败,用户名不正确", 1002));
  } else {
    let isValid = await comparePassword(user, password);
    if (isValid) {
      let data = await sqlBaseINfo(user, password);
      // 生成token
      data.token = JWT.sign(
        {
          username: user,
        },
        tokenConfig.secretOrPublicKey,
        tokenConfig.options
      );
      res.send(handleRes("登陆成功", 1000, data));
    } else {
      res.send(handleRes("登陆失败,密码不正确", 1002));
    }
  }
};

module.exports = { con_Login };
