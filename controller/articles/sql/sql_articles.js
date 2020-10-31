const Con = require("../../../db/mysql");

module.exports = {
  sqlArticles: (start, pageSize) => {
    let sql = `SELECT articles.id,articles.content,articles.tags,articles.title,articles.update_time,articles.create_time,article_categories.name as category_name FROM articles INNER JOIN article_categories WHERE articles.category_id = article_categories.id LIMIT ${start} , ${pageSize};`;
    let sqlArr = [];
    return Con.sySqlConnect(sql, sqlArr);
  },
  sqlArticle: (id) => {
    let sql = `SELECT articles.id,articles.content as source,articles.tags,articles.title,articles.update_time,articles.create_time,articles.category_id as category FROM articles WHERE  articles.id = ?;`;
    let sqlArr = [id];
    return Con.sySqlConnect(sql, sqlArr);
  },
  sqlDeleteArticle: (id) => {
    let sql = `DELETE FROM articles WHERE id = ?;`;
    let sqlArr = [id];
    return Con.sySqlConnect(sql, sqlArr);
  },
  sqlAddArticle: (category_id, content, tags, title) => {
    let sql = `INSERT INTO articles (category_id, content, tags, title) VALUES (?,?,?,?)`;
    let sqlArr = [category_id, content, tags, title];
    return Con.sySqlConnect(sql, sqlArr);
  },
  sqlEditArticle: (id, title, category, tags, content) => {
    let sql = `UPDATE articles SET title = ?,category_id = ?, tags = ?,content = ? WHERE id = ?`;
    let sqlArr = [title, category, tags, content, id];
    return Con.sySqlConnect(sql, sqlArr);
  },
};
