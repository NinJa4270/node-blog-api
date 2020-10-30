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
  sqlAddUser: (user, password, role_id) => {
    let sql = `INSERT INTO user (user,password,role_id) VALUES (?,?,?)`;
    let sqlArr = [user, password, role_id];
    return Con.sySqlConnect(sql, sqlArr);
  },
  sqlEditUser: (id, user, role_id, password) => {
    let sql,
      sqlArr = [];
    if (password) {
      sql = `UPDATE user SET user = ?,password = ?,role_id=? WHERE id = ?`;
      sqlArr = [user, password, role_id, id];
    } else {
      sql = `UPDATE user SET user = ?,role_id=? WHERE id = ?`;
      sqlArr = [user, role_id, id];
    }
    console.log(sql, sqlArr);
    return Con.sySqlConnect(sql, sqlArr);
  },
};
