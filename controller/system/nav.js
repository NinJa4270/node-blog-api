// 登陆
const handleRes = require("../../utils/others/res.js");
const { sqlnav } = require("./sql/sql_nav");
const { toTree } = require("../../utils/others/index");
const con_Nav = async (req, res) => {
  let { role_id, role } = req.body;
  role = role ? role : "0";
  role_id = role_id ? role_id : 0;
  // 管理员权限
  let data = toTree(await sqlnav(role_id));
  res.send(handleRes("获取成功", 1000, data));
};

module.exports = { con_Nav };
