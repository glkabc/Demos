// 生产环境配置
const site = 'http://47.98.135.64:8090'
// const site = 'http://47.99.96.51:8090'

/*
//zlwu6 注释 HOST值为undefined
const HOST = process.env.HOST
if (HOST === 'prod') {
    site = 'http://api.iluoboshow.com'
} else if (HOST === 'test') {
    site = 'http://47.99.96.51:8090'
} else if (HOST === 'v1') {
    site = 'http://v1.iluoboshow.com:8081'
} else if (HOST === '200') {
    site = 'http://api.200.iluoboshow.com'
} else {
    site = 'http://47.98.135.64:8090'
}
 */

module.exports = {
  site: site // 文件上传服务器地址
}
