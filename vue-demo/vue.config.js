const path = require("path"); //引入path模块
const resolve = dir => path.join(__dirname, dir); // 将文件组成绝对路径

module.exports = {
  chainWebpack: config => {
    //添加别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@views", resolve("src/views"))
      .set("@api", resolve("src/api"))
      .set("@components", resolve("src/components"))
      .set("@configs", resolve("src/configs"))
      .set("@utils", resolve("src/utils"));
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#1478e3',
          'info-color': '#22b8cf',
          'warning-color': '#feaa19',
          'error-color': '#fd5158',
          'text-color': '#333333',
          'form-item-margin-bottom': '18px',
          'modal-header-bg': '#F6F7FB',
        },
        javascriptEnabled: true,
      },
    },
  },
};
