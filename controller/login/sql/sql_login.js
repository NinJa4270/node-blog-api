const Con = require("../../../db/mysql");

// 获取用户基本信息
module.exports = {
  sqlBaseINfo:(user, password) => {
    let sql = `SELECT user.user,user.create_time,user.update_time,role.role_name,role.role,role.id as role_id FROM user INNER JOIN role  WHERE user.user = ? AND user.password = ? AND user.role_id = role.id;`;
    let sqlArr = [user, password];
    return Con.sySqlConnect(sql, sqlArr);
  }
} 