const mysql = require('mysql')
module.exports = {
  // 数据库配置
  config: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true,
  },
  // 连接数据库，使用连接池
  // 连接池对象
  sqlConnect: function (sql, sqlArr, callBack) {
    var pool = mysql.createPool(this.config)
    pool.getConnection((err, conn) => {
      console.log('mysql数据连接成功')
      if (err) {
        console.log('连接失败')
        return
      }
      // 事件驱动回调
      conn.query(sql, sqlArr, callBack)
      // 释放连接
      conn.release()
    })
  },
  // promise回调

  sySqlConnect(sySql, sqlArr) {
    return new Promise((resolve, reject) => {
      var pool = mysql.createPool(this.config)
      pool.getConnection((err, conn) => {
        console.log('mysql数据连接成功')
        if (err) {
          reject(err)
        } else {
          // 事件驱动回调
          conn.query(sySql, sqlArr, (err, data) => {
            if (err) {
              reject(err)
            } else {
              resolve(data)
            }
          })
          // 释放连接
          conn.release()
        }
      })
    }).catch(err => {
      console.log(err)
    })
  },
}