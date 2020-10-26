const handleRes = require("../../utils/others/res.js");
const { sqlnav, sqlDeleteNav } = require("./sql/sql_nav");
const { toTree } = require("../../utils/others/index");
const con_Nav = async (req, res) => {
  let { role_id, role } = req.body;
  role = role ? role : "0";
  role_id = role_id ? role_id : 0;
  // 管理员权限
  let data = toTree(await sqlnav(role_id));
  res.send(handleRes("获取成功", 1000, data));
};

const con_addNav = async (req, res) => {
  let { id } = req.body;
  res.send(handleRes("获取成功", 1000, id));
};

const con_deleteNav = async (req, res) => {
  let { id } = req.body;
  try {
    await sqlDeleteNav(id);
    res.send(handleRes("删除成功", 1000));
  } catch (e) {
    res.send(handleRes("删除失败", 1000, e));
  }
};

module.exports = { con_Nav, con_addNav, con_deleteNav };
