const handleRes = require("../../utils/others/res.js");
const {
  sqlUser,
  sqlEditUser,
  sqlDeleteUser,
  sqlAddUser,
} = require("./sql/sql_users");
const { paging } = require("../../utils/mysql/index");

const con_User = async (req, res) => {
  try {
    let { pageNum, pageSize } = req.body;
    let data = await paging(pageNum, pageSize, "user", sqlUser);
    res.send(handleRes("获取成功", 1000, data));
  } catch (e) {
    console.log(e);
    res.send(handleRes("获取失败", 1009, e));
  }
};

const con_addUser = async (req, res) => {};

const con_deleteUser = async (req, res) => {};

const con_editUser = async (req, res) => {};

module.exports = { con_User, con_addUser, con_deleteUser, con_editUser };
