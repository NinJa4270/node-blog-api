const redis = require('redis')
const { REDIS_CONF } = require('../config/dbConfig')

console.log(process.env.REDIS_PASS)
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host,{auth_pass:process.env.REDIS_PASS})

redisClient.on('ready', res => {
  console.log('redis启动成功', res)
})

redisClient.on('error', err => {
  console.log('redis启动失败', err)
})

module.exports = {
  redisClient,
}
