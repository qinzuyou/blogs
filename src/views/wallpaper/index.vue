<script setup lang="ts">
import Huge from '@/components/hugescreen/index.vue'

import Sidebar from '@/components/sidebar/index.vue'
import { ref, reactive } from 'vue'
import { allType, typeWallpaper, uploadWallpaper } from "@/utils/wallpaper"
import ImgModel from "@/components/imgModel/index.vue"


import Tool from '@/assets/tool/index'

let typeList:any=ref('')

let wallpaperList=reactive([])
let pages=ref(1)

let size = ref(8)

let total =ref()

let type=ref(null)

let active=ref(-1)

let loading=ref(false)
allType().then(res=>{
      typeList.value=res
})

updateList()

function typeCut(index:any,name:any){
    active.value=index
    type.value=name
    console.log(index,name);
    
    updateList()
}

function updateList(){
  typeWallpaper(pages.value,size.value,type.value).then((res:any)=>{
   
    res.records=res.records.map((item:any)=>{
          item.cover=Tool.baseURL+"/api"+ item.cover
          return {
            ...item
          }
    })
    total.value=res.total
    wallpaperList.splice(0)
    wallpaperList.push(...res.records)

    
    if(wallpaperList.length==0) loading.value=true

    
  })
}

function pchange(e: any) {
    pages.value=e
    updateList()
}

let newImgModel:any=ref("")

let imgModelShow=ref(false)

function imgShowCut(img:any){
  imgModelShow.value=!imgModelShow.value
  newImgModel.value=img
}

function showCut(){
  imgModelShow.value=!imgModelShow.value

}

</script>

<template>
  <ImgModel v-if="imgModelShow" @set-show="showCut" :img="newImgModel"></ImgModel>
  <div class="wallpaper">
    <Huge :img="'/images/2.jpg'" :title="'康康壁纸'"></Huge>
    <div class="wallpaper-box fade-in-bottom">

      <div class="wallpaper-left">

        <div class="wallpaper-type shadow">
          <div class="wallpaper-title">
            壁纸分类
          </div>
          <ul class="type-list">
            <li :class="{'active':active==-1}" @click="typeCut(-1,null)">全部</li>
            <li :class="{'active':active==index}" @click="typeCut(index,item.name)" v-for="(item,index) in typeList" :key="index">{{item.name}}</li>
          </ul>

        </div>  
        <Transition mode="out-in" name="item-in">
          
        <ul class="wallpaper-list" v-if="wallpaperList.length!==0">
      <transition-group name="item-in" >
        
          <li v-for="(item,index) in wallpaperList" @click="imgShowCut(item.cover)" :key="index">
            <img v-lazy="item.cover" alt="">
          </li>
      </transition-group>
        </ul>
       
        <ul v-else-if="loading" class="list-null">
          <img src="/public/state/null.png" alt="">
          <p>没有数据</p>  
        </ul>
      </Transition>
   
        <div class="pagecat">
          <el-pagination background layout="prev, pager, next" :total="total/size  *10" @current-change="pchange" />
        </div>
      </div>
      <div class="wallpaper-right">
        <Sidebar></Sidebar>
      </div>

    </div>

  </div>
</template>



<style scoped lang="scss">

.wallpaper-title{
  color: var(--main-color);
}
.el-skeleton{
  display: flex;
}
.list-null{
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 400px;
  background: #fff;
  justify-content: center;
  p{
    margin-top: 10px;
  }
  img{
    width: 200px;
    height: 200px;
  }
}
.active{
  background: var(--theme-color) !important;
      color: #fff !important;
}
.pagecat {
  display: flex;
  justify-content: center;
  padding: 20px;

  margin: 0 auto;

  :deep(.el-pagination.is-background .el-pager li) {
    //括号中为需要修改的类名
    background-color: #fff;


  }

  :deep(.btn-prev) {
    //括号中为需要修改的类名
    background-color: #fff !important;


  }

  :deep(.btn-next) {
    background-color: #fff !important;

  }

  :deep(.is-active) {
    //括号中为需要修改的类名
    background-color: #409eff !important;


  }
}

.wallpaper-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-top: 10px;
  cursor: pointer;

  li {
    height: 160px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      border-radius: 6px;

    }
  }

  li::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    // background: rgba(0,0,0,0.4);
    transition:.5s;
  }

  li:hover::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
  }


}

.wallpaper-type {
  padding: 20px;

  .type-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 15px;
    margin-top: 10px;

    li {
      padding: 0 15px;
      height: 33px;
      border-radius: var(--radius-inner);
      background: var(--Xc-mment);
      color: #404044;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      line-height: 33px;
      cursor: pointer;
      transition: .3s;
    }

    li:hover {
      background: var(--theme-color);
      color: #fff;
    }
  }
}

.shadow {
  background-color: var(--main-bg-color);
  transition: .3s !important; 
  border-radius: var(--radius-wrap);
  
  box-shadow: var(--box-shadow);
  width: 100%;
}

.wallpaper-box {
  display: flex;
  justify-content: center;
  margin-top: 10px;

  .wallpaper-left {
    width: 860px;
    margin-right: 20px;
  }

  .wallpaper-right {
    width: 260px;
  }
}

.wallpaper {

  // padding-top: 60px;
}
.item-in-enter-active {
  -webkit-animation: fade-in-bottom 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  animation: fade-in-bottom 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

.item-in-leave-active {
  -webkit-animation: fade-out-bottom 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: fade-out-bottom 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
</style>