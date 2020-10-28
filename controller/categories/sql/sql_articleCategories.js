const Con = require("../../../db/mysql");

module.exports = {
  sqlArt: (start, pageSize) => {
    let sql = `SELECT * FROM article_categories LIMIT ${start} , ${pageSize};`;
    let sqlArr = [];
    return Con.sySqlConnect(sql, sqlArr);
  },
  sqlDeleteArt: (id) => {
    let sql = `DELETE FROM article_categories WHERE id = ?;`;
    let sqlArr = [id];
    return Con.sySqlConnect(sql, sqlArr);
  },
  sqlAddArt: (name) => {
    let sql = `INSERT INTO article_categories (name) VALUES (?)`;
    let sqlArr = [name];
    return Con.sySqlConnect(sql, sqlArr);
  },
  sqlEditArt: (id, name) => {
    let sql = `UPDATE article_categories SET name = ? WHERE id = ?`;
    let sqlArr = [name, id];
    return Con.sySqlConnect(sql, sqlArr);
  },
};
