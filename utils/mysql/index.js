const Con = require("../../db/mysql");
const { toFormat } = require("../../utils/others/index");
const mysqlUtils = {
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
    let res = toFormat(await Con.sySqlConnect(sql, sqlArr))[0].count;
    return res > 0 ? true : false;
  },
  sqlAll: async (table) => {
    let sql = `SELECT COUNT(*) as total  FROM ${table};`;
    let sqlArr = [];
    let total = toFormat(await Con.sySqlConnect(sql, sqlArr))[0].total;
    return total;
  },
  paging: async (pageNum, pageSize, table, callback) => {
    pageNum = pageNum ? pageNum : 1;
    pageSize = pageSize ? pageSize : 10;
    let start = (pageNum - 1) * pageSize;
    let list = await callback(start, pageSize);
    let total = await mysqlUtils.sqlAll(table);
    let maxPage = Math.ceil(total / pageSize);
    let hasNextPage = pageNum < maxPage ? true : false;
    let data = {
      list,
      total,
      maxPage,
      hasNextPage,
    };
    return data;
  },
}
module.exports = mysqlUtils;
