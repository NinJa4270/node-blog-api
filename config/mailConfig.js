module.exports = {
  //设置邮箱配置
  config: {
    host: process.env.MAIL_HOST, //邮箱服务的主机，如smtp.qq.com
    port: process.env.MAIL_PORT, //对应的端口号
    //开启安全连接
    secure: true,
    secureConnection: true,
    //secureConnection:false,
    //用户信息
    auth: {
      // 发件人邮箱账号
      user: process.env.MAIL_USER,
      //发件人邮箱的授权码 这里可以通过qq邮箱获取 并且不唯一
      pass: process.env.MAIL_PASS,
    },
  },
}
