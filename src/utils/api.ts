import { request } from '@/utils/axios'

// 调用测试
export function getTest() {
  return request({
    url: '/xxxxx/',//此处为自己请求地址
    method: 'get'
  })
}


//获取所有书本
export function AllBook() {
    return request({
      url: '/allBook',//此处为自己请求地址
      method: 'get'
    })
  }
//根据id返回书本
export function getBook(id:number) {
  return request({
    url:`findBySno/${id}`,//此处为自己请求地址
    method: 'get'
  })
}




  