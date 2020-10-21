const Con = require("../../db/mysql");

const con_Goods = async (req, res) => {
  let data = JSON.parse(JSON.stringify(await sqlGoods()))
  res.send({data:data,msg:'请求成功'})
};

const sqlGoods = ()=>{
  let sql = `SELECT * FROM goods`;
  let sqlArr = [];
  return Con.sySqlConnect(sql,sqlArr);
}

module.exports = { con_Goods };