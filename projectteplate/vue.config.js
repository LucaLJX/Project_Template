const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets',resolve('src/assets'))
      // 这里只写了两个个，你可以自己再加，按这种格式.set('', resolve(''))
  },
  devServer: {
    proxy: {
      '/api': {//http://apis.juhe.cn/lottery/types?key=d1f00be1962b53cbd89343e89eecc6c9
        target: 'http://apis.juhe.cn/',   // target表示代理的服务器url
        changeOrigin: true,
        pathRewrite: {     // pathRewrite表示路径重写，key表示一个正则，value表示别名 
          '^/api': ''   // 即用 '/api'表示'http://localhost:3000/api'
        }
      }
    }
  }
}
