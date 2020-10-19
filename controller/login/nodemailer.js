//引入模块
const nodemailer = require("nodemailer");
const { config } = require("../../config/mailConfig");
const redisClient = require("../../db/redis").redisClient;
const { isExistence } = require("../../utils/mysql/index.js");
const handleRes = require("../../utils/others/res");

const transporter = nodemailer.createTransport(config);

const getcode = async (req, res) => {
  // 获取邮箱
  let { user } = req.body;
  if (user == "") {
    return res.send(handleRes("注册失败,邮箱不能为空", 1001));
  }
  let bol = await isExistence("user", { user });
  if (bol) {
    return res.send(handleRes("注册失败,用户名已存在", 1003));
  }
  // 生成随机六位验证码
  let code = Math.random().toFixed(6).slice(-6);
  //设置收件人信息
  let mailOptions = {
    from: "NinJa <731391599@qq.com>",
    to: user, //发给谁
    subject: "注册验证码", //主题是什么
    html: `
      <p>欢迎注册NinJa的博客</p>
      <p>您的验证码是:</p>
      <p style="color:red;font-size:50px">${code}</p>`, //文本内容
  };
  //发送邮件
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error);
    console.log(`Message: ${info.messageId}`);
    console.log(`sent: ${info.response}`);
  });

  setItem(user, code, "1800");
  res.send(handleRes("验证码已发送至您的邮箱,有效期30分钟", 1000));
};

const setItem = (key, value, exprires) => {
  redisClient.set(key, value);
  //设置过期
  if (exprires) {
    redisClient.expire(key, exprires);
  }
};

module.exports = { getcode };
