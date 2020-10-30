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

const con_addUser = async (req, res) => {
  try {
    let { user, password, role_id = 0 } = req.body;
    if (user && password) {
      const newPassword = require("bcrypt").hashSync(password, 10);
      await sqlAddUser(user, newPassword, role_id);
      res.send(handleRes("添加成功", 1000));
    } else {
      res.send(handleRes("添加失败,请输入完成信息", 1001));
    }
  } catch (e) {
    res.send(handleRes("获取失败", 1009, e));
  }
};

const con_deleteUser = async (req, res) => {
  try {
    let { id } = req.body;
    if (id) {
      await sqlDeleteUser(id);
      res.send(handleRes("删除成功", 1000));
    }
  } catch (e) {
    res.send(handleRes("删除失败", 1009, e));
  }
};

const con_editUser = async (req, res) => {
  try {
    let { id, user, password, role_id } = req.body;
    console.log(role_id);
    if (id) {
      if (password) {
        const newPassword = require("bcrypt").hashSync(password, 10);
        await sqlEditUser(id, user, role_id, newPassword);
      } else {
        await sqlEditUser(id, user, role_id);
      }
      res.send(handleRes("修改成功", 1000));
    }
  } catch (e) {
    console.log(e);
    res.send(handleRes("修改失败", 1009, e));
  }
};

module.exports = { con_User, con_addUser, con_deleteUser, con_editUser };
