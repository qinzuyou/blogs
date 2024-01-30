import { request } from '@/utils/axios'


//添加文章
export function addAticle(data:any) {
  return request({
    url: '/t-article/addArticle',//此处为自己请求地址
    method: 'post',
    // data:{
    //     files:data.files,
    //     uId:data.uId,
    //     typeList:data.typeList,
    //     content:data.content,
    //     cover:data.cover,
    //     title:data.title
    // }
    data:data
  })
}
//返回所有文章类型
export function getArticleType() {
  return request({
    url:'t-article-type/allType',//此处为自己请求地址
    method: 'get'
  })
}

//返回所有文章

export function getArticleList(){
  return request({
    url:'t-article/list',
    method:'get'
  })
}




//分页查询
export function getListPage(pn:any,sp:any){
  return request({
    url:'t-article/listPage',
    params:{
      pn:pn,
      sp:sp
    },
    method:'get'
  })
}

//根据id返回文章
export function getArticleId(id:any){
  return request({
    url:`t-article/getArticleId/${id}`,
    method:'get'
  })
}


//根据文章类型查询
export function typeArticle(pages:any,size:any,type:any){
  return request({
    url:'t-article/typeArticle',
    params:{
      pages:pages,
      size:size,
      type:type
    }
  })
}

//根据id查询
export function aidArticle(aid:any){
  return request({
    url:`t-article/aidArticle/${aid}`,
    method:'get'
  })
}

//发表评论

export function addComment(data:any){
  return request({
    url:'t-comment/addComment',
    method:'post',
    data:data
  })
}

// 获取文章评论
export function aidComment(aid:any){
  return request({
    url:`t-comment/aidComment/${aid}`,
    method:'get',
  })
}
