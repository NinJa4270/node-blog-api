const Con = require("../../db/mysql");
const { toFormat } = require('../../utils/others/index')
module.exports = {
  /**
   *  @description 是否存在数据
   *  @param {string} 表名
   *  @returns {boolean} 0 不存在 
   */
  isExistence: async (table, args) => {
    let sql = `SELECT COUNT(*) as count  FROM ${table} WHERE`,
      sqlArr = [],
      arr = [];
    arr = Object.keys(args);
    arr.map((key, i) => {
      if (i < arr.length - 1) {
        sql += ` ${key} = ? and`;
      } else {
        sql += ` ${key} = ?;`;
      }
      sqlArr.push(args[key]);
    });
    console.log(sql)
    console.log(sqlArr)
    let res = toFormat(await Con.sySqlConnect(sql, sqlArr))[0].count
    return res > 0 ? true :false
  },
};
