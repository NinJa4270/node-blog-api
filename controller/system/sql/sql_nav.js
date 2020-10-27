const Con = require("../../../db/mysql");
module.exports = {
  sqlnav: (role_id) => {
    let sql = `SELECT * FROM nav WHERE role_id <= (SELECT role FROM role WHERE id = ?);`;
    let sqlArr = [role_id];
    return Con.sySqlConnect(sql, sqlArr);
  },
  sqlDeleteNav: (id) => {
    let sql = `DELETE FROM nav WHERE id = ?;`;
    let sqlArr = [id];
    return Con.sySqlConnect(sql, sqlArr);
  },
  sqlAddNav: (name, pid, path, role_id) => {
    let sql = `INSERT INTO nav (name,pid,path,role_id) VALUES (?,?,?,?)`;
    let sqlArr = [name, pid, path, role_id];
    return Con.sySqlConnect(sql, sqlArr);
  },
  sqlEditNav: (id, name, pid, path, role_id) => {
    let sql = `UPDATE nav SET name = ?, pid = ? , path = ? , role_id = ? WHERE id = ?`;
    let sqlArr = [name, pid, path, role_id, id];
    return Con.sySqlConnect(sql, sqlArr);
  },
};
