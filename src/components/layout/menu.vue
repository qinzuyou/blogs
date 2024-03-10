
<script setup lang="ts">
import {ref} from "vue"
import { useRouter, useRoute } from "vue-router";

const emit = defineEmits(['setShow']);
const router = useRouter();
const route = useRoute()
console.log(router.options.routes);
const navlist = router.options.routes

import { useGlobalStore } from '@/stores/index'
// 普通用法
const store = useGlobalStore()

function setShow(){
      emit('setShow')
      
}

function toCut(path:any){
  
  if (path == "/articleList/:type/") {
    router.push({
      path: "/articleList/全部/"
      
    })
  setShow()

    return
  }

  router.push(path)
  setShow()
}
</script>
<template>
  <div class="model-bg" @click="setShow()">
  </div>
  <div class="menu">
    <div class="menu-list">
        <div class="menu-bg">
          <img src="/public/images/2.jpg" alt="">
        </div>
        <div class="user-info">
            <img :src="store.user.portrait" alt="">
            <p class="user-nick">{{store.user.nickname}}</p>
            <p class="user-in">{{store.user.motto}}</p>
        </div>
        <ul class="menu-ul">
          <template v-for="(item,index) in navlist">
            <li v-if="item.meta.show" @click="toCut(item.path)">
              {{ item.meta.title }}
            </li>
          </template>
        </ul>
    </div>
  </div>
</template>


<style scoped lang="scss">
.menu-ul{
  padding: 10px 20px;
  background: var(--muted-border-color);
    border-radius: var(--main-radius);
    margin: 8px;
    li{
      padding: 4px 0;
      display: flex;
      align-items: center;
      color: var(--main-color);
      cursor: pointer;
      transition: .3s;
    }
    li::before{
      content: '';
    width: .4em;
    height: .4em;
    border: .1em solid var(--focus-color);
    border-radius: 1em;
    margin: 0 .4em;
    vertical-align: .1em;
    display: inline-block;
    }
    li:hover{
      color: var(--theme-color);
    }
}
.menu-bg{
  height: 150px;
  img{
   width: 100%;
   height: 100%;
  }
}
.user-info{
  color: var(--main-color);
  
  img{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-top: -45px;
  }
  .user-nick{
    padding: 6px 0;
  }
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.model-bg{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  z-index: 19;
}

.menu{
  position: fixed;
  top: 60px;
  left: 0;
  z-index: 19;
 
  width: 60%;
  height: 100%;
  background: var(--main-bg-color);
}
</style>