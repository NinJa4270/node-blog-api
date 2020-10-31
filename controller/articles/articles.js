const handleRes = require("../../utils/others/res.js");
const {
  sqlAddArticle,
  sqlArticles,
  sqlArticle,
  sqlDeleteArticle,
  sqlEditArticle
} = require("./sql/sql_articles");
const { paging } = require("../../utils/mysql/index");

const con_articleList = async (req, res) => {
  try {
    // 分页
    let { pageNum, pageSize } = req.body;
    let data = await paging(pageNum, pageSize, "articles", sqlArticles);
    res.send(handleRes("获取成功", 1000, data));
  } catch (e) {
    console.log(e);
    res.send(handleRes("获取失败", 1009, e));
  }
};

const con_article = async (req, res) => {
  try {
    // 分页
    let { id } = req.body;
    if (id) {
      let data = (await sqlArticle(id))[0];
      res.send(handleRes("获取成功", 1000, data));
    } else {
      res.send(handleRes("添加失败,缺少必要参数", 1001));
    }
  } catch (e) {
    console.log(e);
    res.send(handleRes("获取失败", 1009, e));
  }
};

const con_addArticle = async (req, res) => {
  try {
    let { category: category_id, source: content, tags, title } = req.body;
    if (category_id && content && tags && title) {
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

const con_deleteArticle = async (req, res) => {
  try {
    let { id } = req.body;
    if (id) {
      await sqlDeleteArticle(id);
      res.send(handleRes("删除成功", 1000));
    }
  } catch (e) {
    res.send(handleRes("删除失败", 1009, e));
  }
};

const con_editArticle = async (req, res) => {
  try {
    let { id, title, category, tags, source:content } = req.body;
    if (id && title && category && tags && content) {
      tags = JSON.stringify(tags);
      await sqlEditArticle(id, title, category, tags, content );
      res.send(handleRes("修改成功", 1000));
    } else {
      res.send(handleRes("添加失败,缺少必要内容", 1001));
    }
  } catch (e) {
    res.send(handleRes("修改失败", 1009, e));
  }
};

module.exports = {
  con_articleList,
  con_addArticle,
  con_deleteArticle,
  con_editArticle,
  con_article,
};
