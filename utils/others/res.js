const handleRes = (msg,code,data) => {
  return {
    msg,
    code,
    data
  } 
};
// 1000 成功
// 1001 缺值
// 1002 不等
// 1003 相等
// 1009 服务器错误




module.exports = handleRes