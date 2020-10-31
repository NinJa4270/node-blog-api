const handleRes = require("../../utils/others/res.js");
const { sqlAddArticle, sqlArticle } = require("./sql/sql_articles");
const { paging } = require("../../utils/mysql/index");

const con_articleList = async (req, res) => {
  try {
    // 分页
    let { pageNum, pageSize } = req.body;
    let data = await paging(pageNum, pageSize, "articles", sqlArticle);
    res.send(handleRes("获取成功", 1000, data));
  } catch (e) {
    console.log(e);
    res.send(handleRes("获取失败", 1009, e));
  }
};

const con_addArticle = async (req, res) => {
  try {
    let { category: category_id, source: content, tags, title } = req.body;
    if (category_id && content && tags && title) {
      content = JSON.stringify(content);
      tags = JSON.stringify(tags);
      await sqlAddArticle(category_id, content, tags, title);
      res.send(handleRes("添加成功", 1000));
    } else {
      res.send(handleRes("添加失败,缺少必要内容", 1001));
    }
  } catch (e) {
    res.send(handleRes("添加失败", 1009, e));
  }
};

const con_deleteArticle = async (req, res) => {};

const con_editArticle = async (req, res) => {};

module.exports = {
  con_articleList,
  con_addArticle,
  con_deleteArticle,
  con_editArticle,
};
