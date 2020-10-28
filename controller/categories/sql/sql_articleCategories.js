const Con = require("../../../db/mysql");

module.exports = {
  sqlArt: (start, pageSize) => {
    let sql = `SELECT * FROM article_categories LIMIT ${start} , ${pageSize};`;
    let sqlArr = [];
    return Con.sySqlConnect(sql, sqlArr);
  },
  sqlDeleteArt: (id) => {
    let sql = `DELETE FROM nav WHERE id = ?;`;
    let sqlArr = [id];
    return Con.sySqlConnect(sql, sqlArr);
  },
  sqlAddArt: (name, pid, path, role_id) => {
    let sql = `INSERT INTO nav (name,pid,path,role_id) VALUES (?,?,?,?)`;
    let sqlArr = [name, pid, path, role_id];
    return Con.sySqlConnect(sql, sqlArr);
  },
  sqlEditArt: (id, name, pid, path, role_id) => {
    let sql = `UPDATE nav SET name = ?, pid = ? , path = ? , role_id = ? WHERE id = ?`;
    let sqlArr = [name, pid, path, role_id, id];
    return Con.sySqlConnect(sql, sqlArr);
  },
};
