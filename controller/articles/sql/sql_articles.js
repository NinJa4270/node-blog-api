const Con = require("../../../db/mysql");

module.exports = {
  sqlArticle: (start, pageSize) => {
    let sql = `SELECT articles.id,articles.content,articles.tags,articles.title,articles.update_time,articles.create_time,article_categories.name as category_name FROM articles INNER JOIN article_categories WHERE articles.category_id = article_categories.id LIMIT ${start} , ${pageSize};`;
    let sqlArr = [];
    return Con.sySqlConnect(sql, sqlArr);
  },
  // sqlDeleteArt: (id) => {
  //   let sql = `DELETE FROM article_categories WHERE id = ?;`;
  //   let sqlArr = [id];
  //   return Con.sySqlConnect(sql, sqlArr);
  // },
  sqlAddArticle: (category_id, content, tags, title) => {
    let sql = `INSERT INTO articles (category_id, content, tags, title) VALUES (?,?,?,?)`;
    let sqlArr = [category_id, content, tags, title];
    return Con.sySqlConnect(sql, sqlArr);
  },
  // sqlEditArt: (id, name) => {
  //   let sql = `UPDATE article_categories SET name = ? WHERE id = ?`;
  //   let sqlArr = [name, id];
  //   return Con.sySqlConnect(sql, sqlArr);
  // },
};
