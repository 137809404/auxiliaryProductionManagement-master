module.exports = {
  outputDir: process.env.VUE_APP_DIR_NAME,
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
        target: 'http://202.199.6.188:8080',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/oauth': {
        target: 'https://openapi.baidu.com',
        changeOrigin: true,
        pathRewrite: {
          '^/oauth': '/oauth'
        }
      },
      '/server_api': {
        target: 'http://vop.baidu.com',
        changeOrigin: true,
        pathRewrite: {
          '^/server_api': 'server_api'
        }
      },
      '/test': {
        // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
        target: 'http://localhost:8000/test',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/test': ''
        }
      }
    }
  }
}
