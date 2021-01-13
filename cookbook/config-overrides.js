const { override, fixBabelImports, addWebpackResolve, addWebpackAlias, addDecoratorsLegacy } = require('customize-cra');
const path = require('path')

module.exports = override(
  // 按需加载
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  }),
  // resolve
  addWebpackResolve({
    extensions: ['.js', '.json', '.jsx']
  }),

  addWebpackAlias({
    '@': path.resolve(__dirname, './src/'),
    '@assets': path.resolve(__dirname, './src/assets/'),
    '@components': path.resolve(__dirname, './src/components/'),
    '@utils': path.resolve(__dirname, './src/utils/')
  }),

  addDecoratorsLegacy()
);