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
};
