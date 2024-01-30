// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src")
      }
    },
    plugins: [vue()],

    server: {
      port: 4000,//端口号
      host: true,//ip地址 或 '0.0.0.0' 或 "loaclhost"
      open: false, //启动后是否自动打开浏览器
      https: false, // 是否开启 https
      proxy: {
        '/g': {
          target: "https://q1.qlogo.cn", //跨域地址
          changeOrigin: true, //支持跨域
          // rewrite: (path) => path.replace('/qqApi', '')//重写路径,替换/api
          // rewrite: (path) => path.replace(/^\/fcg-bin/, "")//重写路径,替换/api


        },
        '/ip': {
          target: " https://apis.map.qq.com/ws/location/v1", //跨域地址
          changeOrigin: true, //支持跨域
          // rewrite: (path) => path.replace('/qqApi', '')//重写路径,替换/api
          // rewrite: (path) => path.replace(/^\/fcg-bin/, "")//重写路径,替换/api


        }

       
        // '/api': {
        //   target: "http://localhost:80/", //跨域地址
        //   changeOrigin: true, //支持跨域
        //   rewrite: (path) => path.replace(/^\/api/, "")//重写路径,替换/api

        // },
        // '/api2': {
        //   target: "http://users.qzone.qq.com/", //跨域地址
        //   changeOrigin: true, //支持跨域
        //   rewrite: (path) => path.replace(/^\/api2/, ""),
        // },

      }
    },


    define: {
      'process.env': {
        'BASE_API': "http://localhost:80/api"
      }
    },





  }
})

