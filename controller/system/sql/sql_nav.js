const Con = require("../../../db/mysql");
module.exports = {
  sqlnav: (role_id) => {
    let sql = `SELECT * FROM nav WHERE role_id <= (SELECT role FROM role WHERE id = ?);`;
    let sqlArr = [ role_id ];
    return Con.sySqlConnect(sql, sqlArr);
  },
};


`SELECT
secondary_nav.id,
mian_nav.main_nav,
secondary_nav.secondary,
secondary_nav.path
FROM (role INNER JOIN mian_nav ON mian_nav.role_id <= ? ) INNER JOIN secondary_nav ON mian_nav.id = secondary_nav.mian;`