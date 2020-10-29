const redisClient = require("../../db/redis").redisClient;

module.exports = {
  setItem: (key, value, exprires) => {
    redisClient.set(key, value);
    //设置过期
    if (exprires) {
      redisClient.expire(key, exprires);
    }
  },
  getItem: async (key) => {
    let value = await new Promise((resolve, reject) => {
      redisClient.get(key, (err, data) => {
        return resolve(data);
      });
    });
    return value;
  },
};
