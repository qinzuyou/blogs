import { request } from '@/utils/axios'



// 返回所有诗句
export function allPoetry(){
  return request({
    url:"/t-poetry/allpoetry"
  })
}

// 返回一句诗句
export function onePoetry(){
  return request({
    url:"/t-poetry/onePoetry"
  })
}