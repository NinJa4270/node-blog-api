// 注册
const { isExistence } = require("../../utils/mysql/index.js");
const handleRes = require("../../utils/others/res.js");
const { getItem } = require("../../utils/redis/index");
const { sqlRegister } = require("./sql/sql_login");
const con_register = async (req, res) => {
  try {
    let { user, password, code } = req.body;
    if (!user || !password || !code) {
      return res.send(handleRes("注册失败,请校验信息", 1001));
    }
    let data = await getItem(user);
    if (code !== data) {
      res.send(handleRes("注册失败,验证码错误或已失效", 1002));
    } else {
      let bol = await isExistence("user", { user });
      if (bol) {
        res.send(handleRes("注册失败,用户名已存在", 1003));
      } else {
        const newPassword = require("bcrypt").hashSync(password, 10);
        await sqlRegister(user, newPassword);
        res.send(handleRes("注册成功", 1000));
      }
    }
  } catch (e) {
    res.send(handleRes("注册失败,服务器错误", 1009, e));
  }
};

module.exports = { con_register };
