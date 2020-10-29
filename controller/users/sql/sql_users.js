const Con = require("../../../db/mysql");

module.exports = {
  sqlUser: (start, pageSize) => {
    let sql = `SELECT user.id,user.user,user.create_time,user.update_time,role.role_name,role.role,role.id as role_id FROM user INNER JOIN role  WHERE user.role_id = role.id LIMIT ${start} , ${pageSize};`;
    let sqlArr = [];
    return Con.sySqlConnect(sql, sqlArr);
  },
  sqlDeleteUser: (id) => {
    let sql = `DELETE FROM user WHERE id = ?;`;
    let sqlArr = [id];
    return Con.sySqlConnect(sql, sqlArr);
  },
  sqlAddUser: (name) => {
    let sql = `INSERT INTO user (name) VALUES (?)`;
    let sqlArr = [name];
    return Con.sySqlConnect(sql, sqlArr);
  },
  sqlEditUser: (id, name) => {
    let sql = `UPDATE user SET name = ? WHERE id = ?`;
    let sqlArr = [name, id];
    return Con.sySqlConnect(sql, sqlArr);
  },
};
