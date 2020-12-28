// 'use strict'
const path = require("path"); //引入path模块
const resolve = dir => path.join(__dirname, dir); // 将文件组成绝对路径
module.exports = {
  // lintOnSave: false
  chainWebpack: config => {
    //添加别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@views", resolve("src/views"))
      .set("@api", resolve("src/api"))
      .set("@components", resolve("src/components"))
      .set("@configs", resolve("src/configs"))
      .set("@utils", resolve("src/utils"))
      .set("@assets", resolve("src/assets"));
  }
};
