// 注册
const Con = require("../../db/mysql");
const redisClient = require('../../db/redis').redisClient
const { isExistence } = require("../../utils/mysql/index.js");
const handleRes = require('../../utils/others/res.js')

const con_register = async (req, res) => {
  let { user, password, code } = req.body;
  if (!user || !password || !code) {
    return res.send(handleRes('注册失败,请校验信息',1001));
  }
  let realCode = redisClient.get(user, async (err, data) => await data) || ''
  if(code != realCode){
    res.send(handleRes('注册失败,验证码错误或已失效',1002));
  }else{
    let bol = await isExistence('user',{user})
    if(bol){
      res.send(handleRes('注册失败,用户名已存在',1003));
    }else{
      res.send(handleRes('注册成功',1000));
    }
  }
};
module.exports = { con_register };
