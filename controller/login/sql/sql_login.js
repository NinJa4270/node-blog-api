const Con = require("../../../db/mysql");
const { toFormat } = require('../../../utils/others/index')
const bcrypt = require("bcrypt")
// 获取用户基本信息
module.exports = {
  sqlBaseINfo:async(user) => {
    let sql = `SELECT user.user,user.create_time,user.update_time,role.role_name,role.role,role.id as role_id FROM user INNER JOIN role  WHERE user.user = ? AND user.role_id = role.id;`;
    let sqlArr = [user];
    return toFormat(await Con.sySqlConnect(sql, sqlArr))[0];;
  },
  comparePassword:async (user,password)=>{
    let sql = `SELECT password FROM user WHERE user = ?`
    let sqlArr = [user];
    let mysqlPassword = toFormat(await Con.sySqlConnect(sql, sqlArr))[0].password;
    const isValid = bcrypt.compareSync(
      password,
      mysqlPassword
    );
    if(isValid){
      return true
    }else{
      return false
    }
  }
} 