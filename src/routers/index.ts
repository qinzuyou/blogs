import AboutVue from "@/views/About.vue"
import HomeVue from "@/views/Home.vue"
import { RouteRecordRaw, createRouter, createWebHashHistory,createWebHistory} from "vue-router"

// 每个路由都需要映射到一个组件。
const routes:RouteRecordRaw[]= [
  { 
    path: '/', 
    name:'home',
    component:()=>import('@/views/home/index.vue'),
    meta:{
      title:'首页',
      show:true
    },


    // children:[
    //   {
    //     path:"/",
    //     name:"home",
    //     component:()=>import('@/views/home/index.vue'),
    //     meta:{
    //       title:'首页'
    //     }
    //   }
    // ]


},
{ 
  path: '/articleList/:type/', 
  name:'articleList',
  component:()=>import('@/views/article/articleList.vue'),
  meta:{
    title:'文章列表',
    show:true,
    name:"全部"

  }

},
{ 
  path: '/document', 
  name:'document',
  component:()=>import('@/views/document/index.vue'),
  meta:{
    title:'文档列表',
    show:true

  },


  children:[
    {
      path:"/document1",
      name:"document1",
      component:()=>import('@/views/document/index.vue'),

      meta:{
        title:'首页'
      }
    },
    {
      path:"/document2",
      name:"document2",
      component:()=>import('@/views/document/index.vue'),

      meta:{
        title:'首页',
      }
    }
  ]


},
{
  path:"/article/:id",
  name:"article",
  component:()=>import('@/views/article/index.vue'),
  meta:{
    title:'文章详情页',
    show:false
  }
},
{
  path:"/articleEdit",
  name:"articleEdit",
  component:()=>import('@/views/article/articleEdit.vue'),
  meta:{
    title:'文章编辑页',
    show:true
  }
},
{
  path:"/login",
  name:"login",
  component:()=>import('@/views/login/index.vue'),
  meta:{
    title:'登录',
    show:true
  }
}
 
]

// 创建路由实例并传递 `routes` 配置
// const router = createRouter({
//   // 使用 hash 模式。
//   history: createWebHashHistory(),
//   routes, // `routes: routes` 的缩写
// })

// 创建router
const router = createRouter({
  // 配置为Hash模式
  // history:createWebHashHistory()

  // 配置为history模式
  history: createWebHistory(process.env.BASE_URL),
  // 配置toures
  routes,
  // 路由跳转时返回顶部
  scrollBehavior() {
      return { top: 0 }
  }
})

// export default router
export {router}
