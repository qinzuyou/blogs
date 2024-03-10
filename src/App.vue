<template>
 
       <Layout ></Layout>

       <!-- <router-view /> -->
  <router-view style="flex:1" :key="route.fullPath" v-slot="{Component}">
    <transition name="app-in" >
   <keep-alive>
      <component :is="Component"/>
   </keep-alive>
   <!-- <component :is="Component"  v-if="!$route.meta.keepAlive"/> -->
  </transition>
      </router-view >

      <!-- <transition>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</transition> -->



      <Footer></Footer>
  <QCanvas v-show="!store.theme"></QCanvas>

 
</template>

<script setup lang="ts">
import Layout from '@/components/layout/index.vue'
import { useRouter, useRoute } from "vue-router"
import {useGlobalStore} from "@/stores/index.ts"
import Footer from "@/components/footer/index.vue"
import QCanvas from "@/components/canvas/index.vue"
const store =useGlobalStore()
//主题化切换
// val: true - 暗, false - 光
const handleThemeChange = (val: Boolean) => {
  if (!val) {
    document.documentElement.setAttribute('theme', 'dark')
  } else {
    document.documentElement.removeAttribute('theme')
  }
}

handleThemeChange(store.theme)


const route = useRoute()



</script>




<!-- //css引用  -->
<link rel="stylesheet" href="https://font.sec.miui.com/font/css?family=MiSans:400,700:MiSans" />


<style  lang="scss">

.app-in-enter-active {
  -webkit-animation: fade-in-bottom 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  animation: fade-in-bottom 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

.app-in-leave-active {
  -webkit-animation: fade-out-bottom 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: fade-out-bottom 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
#nprogress .bar {
  background-color: var(--theme-color) !important;
  border-radius: 4px;
  height: 4px;
}
#app,body,html{
 
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;


}
.footer{

 
}
// ::-webkit-scrollbar{
//   display:none !important;
// }
::-webkit-scrollbar {
  width: 5px; 
  height: 10%
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;  
   border-radius: 10px;

} 
 
/* 滚动条的滑轨背景颜色 */
  ::-webkit-scrollbar-thumb {
  background-color: #A4A9C1;
  border-radius: 10px;
} 

</style>

