const JWT = require("jsonwebtoken");
const { tokenConfig } = require("../../config/token");
const handleRes = require("../../utils/others/res.js");
const { isExistence } = require("../../utils/mysql/index");

const verify = async (req, res, next) => {
  const token = String(req.headers.authorization || "")
    .split(" ")
    .pop();
  const username = String(req.headers.user || "");
  try {
    const { user } = JWT.verify(
      token,
      tokenConfig.secretOrPublicKey,
      tokenConfig.options
    );
    if (user !== username) {
      res.send(handleRes("TOKEN验证失败", 1009, e));
    } else {
      let bol = await isExistence("user", { user });
      if (!bol) {
        res.send(handleRes("登陆失败,用户名不存在", 1002));
      } else {
        await next();
      }
    }
  } catch (e) {
    res.send(handleRes("服务器错误", 1009, e));
  }
};

module.exports = { verify };
