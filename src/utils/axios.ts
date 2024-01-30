import axios from 'axios'
import { ElMessage  } from 'element-plus'

import {showMessage} from '@/utils/status'
import { useGlobalStore } from '@/stores/index'

const store = useGlobalStore()
// import { useRouter, useRoute } from "vue-router";
// import { getToken } from '@/utils/auth'
 
// axios.defaults.withCredentials = true;
axios.defaults.withCredentials = true;//携带cookie

 
export  const request =(options:any)=> {
  return new Promise((resolve, reject) => {
 
    // create an axios instance

    
    const service = axios.create({
        
      baseURL: process.env.BASE_API, // api 的 base_url
    //   baseURL: '/api',
      timeout: 80000 // request timeout
    })
 
    // request interceptor  请求拦截器 请求前做出操作
    service.interceptors.request.use(
      (config:any) => {

         // 在发送请求之前做些什么
         let token:string=""
         if(store.user){
           token=store.user.token//此处换成自己获取回来的token，通常存在在cookie或者store里面
         }

        
        if (token) {
          // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
          config.headers['token'] = token
       
          config.headers.Authorization =  + token       
         }
        return config
      },
      error => {
        
         // 对请求错误做些什么
        // Do something with request error
        console.log("出错啦", error) // for debug
        Promise.reject(error)
      }
    )
 
    // response interceptor  响应拦截器  请求响应后做出操作
    service.interceptors.response.use(

      // 对响应数据做点什么
       (response:any) => {
        return response.data
      },
      (error:any) => {
          console.log(error,'ll');
        
    // 对响应错误做点什么
        console.log('err' + error) // for debug
        if(error.message="Network Error" ){
          ElMessage.error('服务器错误')
          console.log(error,'ll');
          // ElMessage.error(error.response.data.message)
        }else if(error.response.status == 403){
        ElMessage.error(showMessage(error.response.status))

        }else{
          // ElMessage.error('服务器请求错误，请稍后再试')

          ElMessage.error(showMessage(error.response.status))
        //   const router =useRouter()
        //   router.push('/')
        }
        return Promise.reject(error)
      }
    )
    // 请求处理
    service(options)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
 
 
export default request