const handleRes = require("../../utils/others/res.js");
const { sqlArt } = require("./sql/sql_articleCategories");
const { paging } = require("../../utils/mysql/index");
const con_articleCategories = async (req, res) => {
  try {
    // 分页
    console.log(111);
    let { pageNum, pageSize } = req.body;
    let data = await paging(
      pageNum,
      pageSize,
      "article_categories",
      sqlArt
    );
    console.log(2222);
    res.send(handleRes("获取成功", 1000, data));
  } catch (e) {
    console.log(e)
    res.send(handleRes("获取失败", 1009, e));
  }
};

const con_addNav = async (req, res) => {
  try {
    let { name, pid, path, role_id } = req.body;
    await sqlAddNav(name, pid, path, role_id);
    res.send(handleRes("添加成功", 1000));
  } catch (e) {
    res.send(handleRes("获取失败", 1009, e));
  }
};

const con_deleteNav = async (req, res) => {
  let { id } = req.body;
  try {
    await sqlDeleteNav(id);
    res.send(handleRes("删除成功", 1000));
  } catch (e) {
    res.send(handleRes("删除失败", 1009, e));
  }
};

const con_editNav = async (req, res) => {
  let { id, name, pid, path, role_id } = req.body;
  try {
    await sqlEditNav(id, name, pid, path, role_id);
    res.send(handleRes("修改成功", 1000));
  } catch (e) {
    res.send(handleRes("修改失败", 1009, e));
  }
};

module.exports = { con_articleCategories };
