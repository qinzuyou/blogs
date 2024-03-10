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




//文章分页查询
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

//根据文章id返回文章
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


//下一篇

export function articleNext(aid:any){
  return request({
      url:`t-article/articleNext/${aid}`,
      methot:'get'
  })
}

//上一篇
export function articlePrevious(aid:any){
  return request({
      url:`t-article/articlePrevious/${aid}`,
      methot:'get'
  })
}




//添加标签
export function addLabel(data:any){
  return request({
    url:`t-label/addLabel`,
    method:'post',
    data:data
  })
}

//获取用户所有标签

export function uidLabel(pages:any,size:any,uid:any){
  return request({
    url:"t-label/uidLabel",
    params:{
      pages:pages,
      size:size,
      uid:uid
    }
  })
}

//获取用户户所有文章获得的评论

export function commentCount(pages:any,size:any,uid:any){
  return request({
    url:"t-comment/commentCount",
    params:{
      pages:pages,
      size:size,
      uid:uid
    }
  })
}


//根据用户id分页查询文章

export function uidArticle(pages:any,size:any,uid:any,type=""){
  return request({
    url:"t-article/uidArticle",
    params:{
      pages:pages,
      size:size,
      uid:uid,
      type:type
    }
  })
}


//增加阅读量
export function addHits(aid:any){
    return request({
      url:"t-article/addHits",
      params:{
        aid:aid
      }
    })
}


//根据文章id获取评论数量
export function aidCommentCount(pages:any,size:any, aid:any){
  return request({
    url:"t-comment/aidCommentCount",
    params:{
      pages:pages,
      size:size,
      aid:aid
    }
  })
}

//模糊查询
export function searchArticle(pages:any,size:any,val:any){
    return request({
      url:"t-article/searchArticle",
      params:{
        pages:pages,
        size:size,
        val:val
      }
    })
}


//根据用户id获取文章类型数量
export function uidAllType(uid:any=""){
  return request({
    url:"t-article-type/uidAllType",
    method:'get',
    params:{
      uid:uid
    }
  })
}



//根据用户id获取文章类型数量
export function uidAllLabel(uid:any=""){
  return request({
    url:"t-label/uidAllLabel",
    method:'get',
    params:{
      uid:uid
    }
  })
}


//根据标签模糊查询
export function labelArticle(pages:any,size:any,val:any){
  return request({
    url:"t-article/labelArticle",
    params:{
      pages:pages,
      size:size,
      val:val
    }
  })
}

//文章归档
export function Stats(uid:any){
  return request({
    url:"t-article/Stats",
    params:{
      uid:uid
    }
  })
}


//文章归档
export function recommend(re:any){
  return request({
    url:"t-article/recommend",
    method:'get',
    params:{
      re:re
    }
  })
}