//引入模块
const nodemailer = require('nodemailer')
const { config } = require('../../config/mailConfig')
const redisClient = require('../../db/redis').redisClient
const Con = require('../../db/mysql')
const { isExistence } = require("../../utils/mysql/index.js");

const transporter = nodemailer.createTransport(config)

const getcode = async (req, res) => {
  // 获取邮箱
  let { user } = req.query
  if (user == '') {
    res.send({ msg: '邮箱不能为空', rescode: 1001 })
  }
  // 判断是否存在该用户
  let ishave = await isExistence(user)
  if (JSON.parse(JSON.stringify(ishave || ''))[0].usercount !== 0) {
    return res.send({ msg: '用户已存在', rescode: 1002 })
  }
  // 生成随机六位验证码
  let code = Math.random().toFixed(6).slice(-6)
  //设置收件人信息
  let mailOptions = {
    from: 'NinJa <731391599@qq.com>', //谁发的
    to: user, //发给谁
    subject: '注册验证码', //主题是什么
    html: `
      <p>欢迎注册NinJa管理系统</p>
      <p>您的验证码是:</p>
      <p style="color:red;font-size:50px">${code}</p>`, //文本内容
  }
  //发送邮件
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error)
    console.log(`Message: ${info.messageId}`)
    console.log(`sent: ${info.response}`)
  })

  setItem(user, code, '1800')
  res.send({ msg: '验证码已发送至您的邮箱,有效期30分钟', rescode: 0 })
}

const setItem = (key, value, exprires) => {
  redisClient.set(key, value)
  //设置过期
  if (exprires) {
    redisClient.expire(key, exprires)
  }
}

// 判断用户名是否存在
let selectRegister = user => {
  let sql = `SELECT COUNT(*) AS usercount FROM vue_users WHERE user = ?`
  let sqlArr = [user]
  return Con.sySqlConnect(sql, sqlArr)
}

module.exports = { getcode }
