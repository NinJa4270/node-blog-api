const express = require('express');
const app = express()
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config('./.env')

app.use(cookieParser())
app.use(require('cors')())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
 
const redisClient = require('./db/redis').redisClient
const sessionStore = new RedisStore({
  client: redisClient,
})
app.use(
  session({
    secret: process.env.SECRET_SESSION, // 密匙可以随意添加，建议由大写+小写+加数字+特殊字符组成
    cookie: {
      path: '/', // 默认配置
      httpOnly: true, // 默认配置，只允许服务端修改
      maxAge: 30 * 60 * 1000, // cookie 失效时间30分钟
    },
    store: sessionStore, // 将 session 存入 redis
  })
)
// 引入路由
require('./routes/login')(app)
require('./routes/goods')(app)

app.listen(3333,()=>{
  console.log('http://localhost:3333')
})