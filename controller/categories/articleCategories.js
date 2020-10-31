const handleRes = require("../../utils/others/res.js");
const {
  sqlArt,
  sqlEditArt,
  sqlDeleteArt,
  sqlAddArt,
} = require("./sql/sql_articleCategories");
const { paging } = require("../../utils/mysql/index");
const con_art = async (req, res) => {
  try {
    // 分页
    let { pageNum, pageSize } = req.body;
    let data = await paging(pageNum, pageSize, "article_categories", sqlArt);
    res.send(handleRes("获取成功", 1000, data));
  } catch (e) {
    console.log(e);
    res.send(handleRes("获取失败", 1009, e));
  }
};

const con_addArt = async (req, res) => {
  try {
    let { name } = req.body;
    if (name) {
      await sqlAddArt(name);
      res.send(handleRes("添加成功", 1000));
    }
  } catch (e) {
    res.send(handleRes("添加失败", 1009, e));
  }
};

const con_deleteArt = async (req, res) => {
  try {
    let { id } = req.body;
    if (id) {
      await sqlDeleteArt(id);
      res.send(handleRes("删除成功", 1000));
    }
  } catch (e) {
    res.send(handleRes("删除失败", 1009, e));
  }
};

const con_editArt = async (req, res) => {
  try {
    let { id, name } = req.body;
    if (id && name) {
      await sqlEditArt(id, name);
      res.send(handleRes("修改成功", 1000));
    }
  } catch (e) {
    res.send(handleRes("修改失败", 1009, e));
  }
};

module.exports = { con_art, con_addArt, con_deleteArt, con_editArt };
