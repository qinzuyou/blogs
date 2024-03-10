<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { ref, reactive, onMounted, onUnmounted } from "vue";

import Search from "@/components/search/index.vue"
import Menu from "@/components/layout/menu.vue"
const router = useRouter();
const route = useRoute()
console.log(router.options.routes);
const navlist = router.options.routes

import { useGlobalStore } from '@/stores/index'
// 普通用法
const store = useGlobalStore()

//搜索栏切换
let SearchCut = ref(false)

function SearchCuts() {
  SearchCut.value = !SearchCut.value
}

//菜单栏
let menuShow=ref(false)

function menuShowCut(){
  menuShow.value=!menuShow.value
}


//前往个人中心
function toPersonal(uid:any){
  router.push({
    path:`/personal/${uid}`,
    state:{
      data:"user"
    }
  })
}


//导航列表点击样式控制
let navActive = ref(-1)

let down = ref(-1)

//鼠标经过导航列表
const navPass = function (index: any) {
  down.value = index

  // console.log(down.value);

}


const navActiveC = function (index: any, index2: any,path:any) {
console.log(path);

  pageCut(path)
  navActive.value = (index + index2)
  // console.log(navActive.value);


}

const navActiveC2 = function (index: any, index2: any,path:any) {
console.log(path);

  pageCut(path)
  navActive.value = (index + index2)
  // console.log(navActive.value);


}



let backTopFlag = ref(false)
let navTran = ref(false)

const handleScroll = () => {
  if (document.documentElement.scrollTop > 20) {
    backTopFlag.value = true

    navTran.value = true
  } else {
    backTopFlag.value = false

    navTran.value = false
  }
  //   console.log(navTran.value);

  //往下滑超过20则显示 否则则不显示按钮
}


//返回顶部
const backTop = () => {
  let top = document.documentElement.scrollTop//获取点击时页面的滚动条纵坐标位置
  const timeTop = setInterval(() => {
    document.documentElement.scrollTop = top -= 50//一次减50往上滑动
    if (top <= 0) {
      clearInterval(timeTop)
    }
  }, 5)//定时调用函数使其更顺滑
}

onMounted(() => {
  //   const handleScroll = () => {
  //   if (document.documentElement.scrollTop > 20) {
  //     goimg.value.style="height:500px"
  //   } else {
  //     goimg.value.style="height:20px;width:4px"
  //   }
  //   //往下滑超过20则显示 否则则不显示按钮
  // }

  window.addEventListener('scroll', handleScroll)
})//监听滚动事件
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})//离开页面时移除监听事件



// 公共
const userin = ref(false)
const lotitle = ref("")
const loes = ref(false)
function uin() {
  userin.value = true
}
function uout() {
  userin.value = false
}
function hintno() {
  setTimeout(function () {
    loes.value = false

  }, 2000)
}

function pageCut(path: any) {

  if (path == "/articleList/:type/") {
    router.push({
      path: "/articleList/全部/"
    })
    return
  }else if(path == "/tags/:type/"){
    router.push({
      path: "/tags/全部/"
    })
    return
  }else if(path == "/classifications/:type/"){
    router.push({
      path: "/classifications/全部/"
    })
    return
  }else if(path == "/pigeonhole"){
    router.push({
      path: "/classifications/全部/"
    })
    return
  }

  router.push(path)

}

//退出登录

function userdelete(){
      store.userdelete()
      userin.value=false

}



//主题切换
const handleThemeChange = (val: Boolean) => {
  store.themeCut(val)

  console.log(store.theme);
  
  if (!val) {
    document.documentElement.setAttribute('theme', 'dark')
  } else {
    document.documentElement.removeAttribute('theme')
  }
}

</script>

<template>
  <div>
    <Menu @set-show="menuShowCut" v-if="menuShow"></Menu>
    <header :class="{ 'nav-bg': navTran, 'header-bg': SearchCut,'menu-show-bg':menuShow&&store.theme}">
      <nav class="blog-nav">

        <div class="menu-icon" @click="menuShowCut">
          <i class="mi-close">
            <i :class="{'i-toggle':menuShow}"></i>
            <i :class="{'i-toggle2':menuShow}"></i>
            <i :class="{'i-toggle3':menuShow}"></i>
          </i>

          <!-- <svg-icon iconName="icon-search" class="sous-icon" color="#fff" ></svg-icon> -->
        </div>
        <div class="nav-left">


          <div class="blog-logo">
            <img src="@/assets/images/1.jpg" alt="">
          </div>
          <ul class="nav-conter">
            <template v-for="(item, index) in navlist" :key="index">
              <li class="blog-list" v-if="item.meta.show" @click.stop="navActiveC(index, 0,item.path)" @mouseenter="navPass(index)"
                @mouseleave="down = -1">
                <a  :class="{ 'active': navActive == index, 'nav-font': navTran }">
                  <svg-icon :iconName="item.meta.icon" class="sous-icon" color="#000"></svg-icon>
                  {{ item.meta.title }}
                  <!-- (navTran&&store.theme)||(menuShow&&store.theme) -->
                  <div v-if="store.theme">
                     <svg-icon iconName="icon-arrow-down" v-if="item.children&&store.theme&&!navTran" class="down-icon"
                    :class="{ 'down-cut': down == index }" color="#fff"></svg-icon>
                    <svg-icon iconName="icon-arrow-down" v-if="item.children&&store.theme&&navTran" class="down-icon"
                    :class="{ 'down-cut': down == index }" color="#000"></svg-icon>
                  </div>
                  <div v-else>
                    <svg-icon iconName="icon-arrow-down" v-if="item.children" class="down-icon"
                    :class="{ 'down-cut': down == index }" color="#fff"></svg-icon>
                  </div>
                 

                </a>

            
                <Transition name="swing">
                  <div class="blog-list-l" v-if="item.children && down == index">
                    <ul>
                      <li :class="{ 'blog-list-active': navActive == (index + index2) }" @click.stop="navActiveC2(index, index2,item2.path)"
                        v-for="(item2, index2) in item.children" :key="index2">
                        {{ item2.meta.title }}
                      </li>

                    </ul>
                  </div>
                </Transition>
              </li>
            </template>

          </ul>
        </div>
        <div class="nav-right">
          <!-- <ul v-if="navTran">
            <li>
              <svg-icon iconName="icon-search" class="sous-icon" color="#000"></svg-icon>
            </li>
            <li>
              <svg-icon iconName="icon-user" class="sous-icon" color="#000"></svg-icon>
            </li>
            <li class="theme-box">
              <transition mode="out-in">
              <svg-icon iconName="icon-taiyang_sun61" class="sous-icon" color="#000" v-if="store.theme" @click="handleThemeChange(false)"></svg-icon>
              <svg-icon iconName="icon-yueliangxingxing" class="sous-icon" color="#000" v-else @click="handleThemeChange(true)"></svg-icon>
            </transition>
            </li>
          </ul> -->
          <ul >
            <li @click="SearchCuts">
              <Transition mode="out-in">           
              <svg-icon iconName="icon-search"  color="#000" v-if="(navTran&&store.theme)||(menuShow&&store.theme)"></svg-icon>
              <svg-icon iconName="icon-search"  color="#fff" v-else></svg-icon>
  </Transition>
            </li>
            <div class="user-login">

              <ul class="user-login-r" v-if="!store.user">
                <li>
            <router-link to="/login"> 
<transition mode="out-in">
              <svg-icon iconName="icon-user"  color="#000" v-if="(navTran&&store.theme)||(menuShow&&store.theme)"></svg-icon>
              
              <svg-icon iconName="icon-user"  color="#fff" v-else></svg-icon>
</transition>
            </router-link> 
                </li>
                <!-- <li>
                  <router-link to="/login"> 登录</router-link>
                </li>
                <li>
                  <a> 注册</a>
                </li> -->
              </ul>

              <div class="user-box" @mouseenter="uin" @mouseleave="uout" v-else>
                <img :src="store.user.portrait">

                <transition mode="in-out" name="item-in">
                  <div class="user-box-1" v-show="userin">
                    <!-- :class="{'fade-in-bottom':userin,'fade-out-bottom':!userin}" -->
                    <div class="user-top">
                      <img :src="store.user.portrait">
                      <div>
                        <p>{{ store.user.account }}</p>
                        <p>{{ store.user.account }}</p>
                      </div>
                    </div>
                    <ul class="user-list">
                      <li>
                        <svg-icon iconName="icon-bianjiwenzhang_huaban" color="#00a2e3"></svg-icon>
                        <span>0</span>
                      </li>
                      <li>
                        <svg-icon iconName="icon-liuyan" color="rgb(30, 202, 119)"></svg-icon>
                        <span>0</span>
                      </li>
                      <li>
                        <svg-icon iconName="icon-good" color="#eb83cd"></svg-icon>
                        <span>0</span>
                      </li>
                      <li>
                        <svg-icon iconName="icon-good" color="#eb83cd"></svg-icon>
                        <span>0</span>
                      </li>
                    </ul>
                    <ul class="user-out">
                      <li @click="toPersonal(store.user.uid)">
                        <div>
                          <svg-icon iconName="icon-yonghu" color="#00a2e3;"></svg-icon>
                        </div>
                        <p>个人中心</p>
                      </li>
                      <li>
                        <div>
                          <svg-icon iconName="icon-bianjiwenzhang_huaban" color="rgb(30, 202, 119)"></svg-icon>
                        </div>
                        <p>发布文章</p>
                      </li>
                      <li @click="userdelete">
                        <div>
                          <svg-icon iconName="icon-login" color="#eb83cd"></svg-icon>
                        </div>
                        <p>退出登录</p>
                      </li>
                    </ul>
                  </div>
                </transition>

              </div>

            </div>
            <transition mode="out-in">

            <li class="theme-box" v-if="(navTran&&store.theme)||(menuShow&&store.theme)">
              <transition mode="out-in">
              <svg-icon iconName="icon-taiyang_sun61" class="sous-icon" color="#000" v-if="store.theme" @click="handleThemeChange(false)"></svg-icon>
              <svg-icon iconName="icon-yueliangxingxing" class="sous-icon" color="#000" v-else @click="handleThemeChange(true)"></svg-icon>
            </transition>
            </li>

            <li class="theme-box" v-else>
              <transition mode="out-in">
              <svg-icon iconName="icon-taiyang_sun61" class="sous-icon" color="#fff" v-if="store.theme" @click="handleThemeChange(false)"></svg-icon>
              <svg-icon iconName="icon-yueliangxingxing" class="sous-icon" color="#fff" v-else @click="handleThemeChange(true)"></svg-icon>
            </transition>
            </li>
          </transition>

          </ul>

        </div>
      </nav>
    </header>



    <Search :Show="SearchCut" @set-show="SearchCuts"></Search>




    <div class="go-back" :style="{ opacity: backTopFlag ? '1' : '0' }">
      <!-- :class="backTopFlag?'go-back-top':''" -->
      <img ref="goimg" src="@/assets/images/top2.png" alt=""
        :style="{ height: backTopFlag ? '500px' : '20px', width: backTopFlag ? '4px' : '4px' }">
      <img @click="backTop" src="@/assets/images/top.png" alt="">
    </div>
  </div>
</template>



<style scoped lang="scss">
.menu-show-bg{
  background: #fff;
}
.i-toggle{
  transform: rotate(-45deg);
    // transform-origin: top right;
  
    // width: calc(1em + 1px) !important;
    width: 16px !important;
    margin-left: 2px !important;
  
}
.i-toggle2{
  display: none !important;

}
.i-toggle3{  transform: rotate(45deg);
    transform-origin: bottom right;

   margin-left: -1px;


}

.mi-close{
  cursor: pointer;
  i{
    display: block;
    width: 10px;
    height: 2px;
    border-radius:2px ;
    background: var(--header-color);
    transition: .3s;
    

  }
  i:nth-child(1){
    width: 12px;
  }
  i:nth-child(2){
    margin-top: 4px;
    width: 14px;
  }
  i:nth-child(3){
    width: 16px;
    margin-top: 4px;
  }
}
.menu-icon{
  display: none;
  @media screen and (max-width: 1024px) {
      display: block;
  }
}
.sous-icon{
  cursor: pointer;
}

.theme-box{
  .svg-icon{
    cursor: pointer;
  }
}
.item-in-enter-active {
  -webkit-animation: fade-in-bottom 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  animation: fade-in-bottom 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

.item-in-leave-active {
  -webkit-animation: fade-out-bottom 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: fade-out-bottom 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.user-out {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;

  li {
    cursor: pointer;
    transition: all .3s;
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;


    }

    p {
      margin-top: 6px;
      font-size: 12px;
      font-weight: 600;
      transition: .3s;
    }


  }

  li:hover {
    opacity: .7;
  }

  li:nth-child(1) {
    div {
      background: rgba(52, 168, 240, 0.2);
    }

    color:var(--theme-color)
  }

  li:nth-child(2) {
    div {
      background: rgba(83, 225, 98, 0.2);
    }

    color:rgb(30, 202, 119)
  }

  li:nth-child(3) {
    div {
      background: rgba(221, 81, 151, 0.2);
    }

    color:#eb83cd
  }
}

.user-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;

  li {
    cursor: pointer;
    transition: .3s;
    background: rgba(79, 169, 224, 0.3);
    flex-basis: 30%;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 6px;
    margin: 0 5px;

    .svg-icon {
      font-size: 12px;
    }

    span {
      font-size: 14px;
      margin-left: 4px;
    }
  }

  li:hover {
    opacity: .7;
  }

  li:nth-child(1) {
    color: var(--theme-color);
    background: rgba(52, 168, 240, 0.2);
  }

  li:nth-child(2) {
    color: rgb(30, 202, 119);
    background: rgba(83, 225, 98, 0.2);
  }

  li:nth-child(3) {
    color: #eb83cd;
    background: rgba(221, 81, 151, 0.2);
  }


}

.user-box {
img {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    cursor: pointer;
  }

  position: relative;
}

.user-box-1 {
  position: absolute;
  top: 30px;
  z-index: 10;
  left: -200px;
  background: var(--header-bg);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(50, 50, 50, 0.1);
  padding: 30px 26px;
  // width: 220px;

  .user-top {
    display: flex;
    align-items: center;

    img {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      margin-right: 10px;
    }

    div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;

      p:nth-child(1) {
        font-size: 16px;
        font-weight: 600;
        color: var(--nav-color);
      }

      p:nth-child(2) {
        font-size: 12px;
        margin-top: 6px;
        color: #999;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

.user-login {
  padding: 0 20px;
    @media screen and (max-width:1024px) {
    display: none;
  }

}

.user-login-r {
  list-style: none;
  display: flex;

  li {
    cursor: pointer;

  }

  .svg-icon{
    font-size: 20px;
  }

  a {
    text-decoration: none;

    padding: 0 4px;
    transition: .3s;
    color: var(--nav-color);

  }

  a:hover {
    color: var(--theme-color);
  }
}


.go-back {
  @media screen and (max-width:1024px) {
    display: none;
  }
  transition: .5s;
  position: fixed;
  right: 10px;
  top: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;

  

  img:nth-child(1) {
    width: 4px;
    height: 20px;
    transition: .3s;
    -webkit-backface-visibility: hidden;
backface-visibility: hidden;
  }

  img:nth-child(2){
    transition: .3s;

  }
  img:nth-child(2):hover {
    cursor: pointer;
    transform: scale(1.1, 1.1);

  }
}

.go-back-top {
  height: 500px;
}

.nav-bg {
  background: var(--main-bg-color) !important;
}

.nav-font {
  color: var(--main-color)!important;

}

/* // 动画 */
.swing-enter-active {
  animation: swing-in-top-fwd 0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
}

.swing-leave-active {
  animation: swing-out-top-bck 0.3s cubic-bezier(0.600, -0.280, 0.735, 0.045) both;
}

.header-bg {
  background: rgba(0, 0, 0, 0.2);

}

header {
  position: fixed;
  left: 0;
  right: 0;
  max-width: 100%;
  background: var(--header-bg-c);

  backdrop-filter: blur(2px);
  transition: .3s;
  box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.2);

  z-index: 20;

  height: 60px;
}

.active {
  // color: var(--theme-color) !important;
  text-shadow: 0 0 4px #fff;
}

.blog-nav {

  @media screen and (max-width:1024px) {
    
  }

  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;

  max-width: 96%;
  margin: 0 auto;
  color: #fff;
  font-size: 15px;


  .blog-logo {
    max-width: 96%;
    padding-right: 20px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  .nav-left {
    display: flex;
    align-items: center;

    .nav-conter {
      @media screen and (max-width: 1024px) {
        transition: .3s;
            display: none;
    }
      display: flex;

      >li {
        cursor: pointer;
        height: 60px;
        line-height: 60px;
        margin-left: 20px;

        a {
          color: #fff;
          display: flex;
          align-items: center;
          transition: .3s;

          .svg-icon {
            margin-right: 6px;
            font-size: 18px;
          }

          .down-icon {
            margin-left: 6px;
            font-size: 16px;
            transition: .3s;
          }
        }
      }
    }

  }


}

.nav-right {
  >ul {
    display: flex;
    align-items: center;

    >li {
      padding: 0 20px;

      >.svg-icon {
        font-size: 20px;
        font-weight: 900;

      }
    }
  }
}


.blog-list-l {


  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
    color: #000;
    border-radius: 4px;
    box-shadow: 0 0 10px #000;
    padding: 10px 0;

    li {
      width: 100%;
      text-align: center;
      height: 40px;
      line-height: 40px;
      transition: .3s;
    }
    li:hover{
      background: rgba($color: #000000, $alpha: 0.1);
  color: var(--theme-color);
    }
  }
}

.blog-list-active {
  background: rgba($color: #000000, $alpha: 0.1);
  color: var(--theme-color);
}
.nav-font{
  color: #fff ;
}

.down-cut {
  transform: rotate(-180deg);
}</style>

