
import { RouteRecordRaw, createRouter, createWebHashHistory,createWebHistory} from "vue-router"
import {useGlobalStore} from "@/stores/index"
import { ElMessage  } from 'element-plus'
import { defineAsyncComponent } from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 每个路由都需要映射到一个组件。
const routes:RouteRecordRaw[]= [
  { 
    path: '/', 
    name:'home',
    // component:()=>import('@/views/home/index.vue'),
    // component:resolve => require(['/views/home/index.vue'],resolve),
    component: defineAsyncComponent(() => import('@/views/home/index.vue')),
    meta:{
      title:'首页',
      show:true,
      icon:'icon-shouye1'
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
    name:"全部",
    icon:'icon-wenjianjia1'
  }

},


{ 
  path: '/pigeonhole', 
  name:'pigeonhole',
  component:()=>import('@/views/pigeonhole/index.vue'),
  meta:{
    title:'文章类型',
    show:true,
    icon:'icon-fenlei'


  },
  // path: '/classifications/:type/', 
  // name:'classifications',
  // component:()=>import('@/views/classifications/classifications.vue'),
  // meta:{
  //   title:'全部分类',
  //   show:true

  // },


  children:[
    // {
    //   path:"",
    
    //   component:()=>import('@/views/pigeonhole/classH.vue'),

    //   meta:{
    //     title:'全部分类22'
    //   }
    // },
    {
      path:"/classifications/:type/",
      name:"classifications",
      component:()=>import('@/views/classifications/classifications.vue'),
      props: true,
      meta:{
        title:'全部分类',
    icon:'icon-fenlei1'
      }
    },
    {
      path:"/tags/:type/",
      name:"tags",
      component:()=>import('@/views/classifications/tags.vue'),

      meta:{
        title:'全部标签',
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
    show:true,
    icon:"icon-tubiaozhizuomoban-"
    
  },
  //进入页面前
  beforeEnter: (to, form, next) => {
    const store = useGlobalStore()
    if (!store.user) {
        ElMessage.error('请先登录!')
        router.push('/login')
        // if (to.name == "login") {
        //     next();
        // } else {
        //     router.push('login')
        // }
    } else {
        next();
    }
}
},
{ 
  path: '/wallpaper', 
  name:'wallpaper',
  component:()=>import('@/views/wallpaper/index.vue'),
  meta:{
    title:'康康壁纸',
    show:true,
    icon:"icon-tupian"


  }

},

{
  path:"/UplodaWallpaper",
  name:"UplodaWallpaper",
  component:()=>import('@/views/wallpaper/uplodaWallpaper.vue'),
  meta:{
    title:'壁纸上传',
    show:true,
    icon:"icon-shangchuanlan"

  },
    //进入页面前
    beforeEnter: (to, form, next) => {
      const store = useGlobalStore()
      if (!store.user) {
          ElMessage.error('请先登录!')
          router.push('/login')
          // if (to.name == "login") {
          //     next();
          // } else {
          //     router.push('login')
          // }
      } else {
          next();
      }
  }
},
{
  path:"/stats",
  name:"stats",
  component:()=>import('@/views/article/stats.vue'),
  meta:{
    title:'网站统计',
    show:true,
    icon:"icon-tongji1"

  }
},
{
  path:"/login",
  name:"login",
  component:()=>import('@/views/login/index.vue'),
  meta:{
    title:'登录',
    show:false
  }
},
{ 
  path: '/personal/:uid/', 
  name:'personal',
  component:()=>import('@/views/user/personal.vue'),
  meta:{
    title:'个人中心',
    show:false,
    name:"个人中心"

  }

},
{ 
  path: '/search/:val/', 
  name:'search',
  component:()=>import('@/views/article/search.vue'),
  meta:{
    title:'搜索',
    show:false,
    name:"搜索"

  }

},
{
  path:'/:pathMatch(.*)*',
  name:'page404',
  component:()=>import('@/views/page404/404.vue'),
  meta:{
    title:'404',
    show:false,
    name:'404'
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

router.beforeEach((to, from, next) => {
  NProgress.start() // 进度条开始
  next()
})
 
router.afterEach(() => {
  NProgress.done() // 进度条结束
})

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载 icon
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})


// export default router
export {router}
