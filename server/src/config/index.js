const os = require('os')

const IpConfig = os.networkInterfaces()
const IP = IpConfig['WLAN 2'][1].address

const serveConfig = {
  serveProt: 3630,
  allowUserHost: '*', // 允许所有用户
}

const mysqlConfig = {
  mysqlHost: 'localhost',
  mysqlUserName: 'root',
  mysqlUserPassword: '123456',
  mysqlUserDatabase: 'test',
  localHostAddress: IP, // 本机地址
}

module.exports = {
  ...serveConfig,
  ...mysqlConfig
}
