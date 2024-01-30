import { request } from '@/utils/axios'

//注册
export function addUser(data:any) {
  return request({
    url: '/t-user/addUser',//此处为自己请求地址
    method: 'post',
    data:data
  })
}

//登录
export function login(data:any) {
  return request({
    url: '/t-user/login',//此处为自己请求地址
    method: 'post',
    data:data
  })
}

//发送验证码
export function sendCode(to:any){
  return request({
    url:'/t-user/register',
    params:{
      to:to
    }
  })
}

//验证验证码
export function verifyCode(code:any){
  return request({
    url:'/t-user/checkCode',
    params:{
      code:code
    }
  })
}

//验证用户是否已存在
export function userVerify(data:any){
  return request({
    url:'/t-user/userVerify',
    params:data
  })
}

//根据邮箱返回用户信息

export function logingUser(data:any){
  return request({
    url:'/t-user/loginAccount',
    method: 'post',
    data:data
  })
}





