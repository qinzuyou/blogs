
import { request } from '@/utils/axios'
//返回所有壁纸类型

export function allType(){
  return request({
    url:'/t-wallpaper-type/allType',
    method: 'get',
  })
}

//壁纸上传
export function uploadWallpaper(data:any){
  return request({
    url:'/t-wallpaper/addWallpaper',
    method:'post',
    data:data
  })
}

//根据壁纸类型分页返回壁纸
export function typeWallpaper(pages:any,size:any,type:any){
  return request({
    url:'/t-wallpaper/typeWallpaper',
    params:{
      pages:pages,
      size:size,
      type:type
    }
  })
}

//随机返回一条数据
export function oneWallpaper(){
 return request({
  url:'/t-wallpaper/oneWallpaper'
 })
}


