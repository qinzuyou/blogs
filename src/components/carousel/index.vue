<template>
  
    <el-carousel height="230px">
      <el-carousel-item v-for="(item,index) in articleList.slice(0,4)" :key="index" >
       <img :src="item.cover" alt="">
      </el-carousel-item>
    </el-carousel>
 
</template>

<script setup lang="ts">
import {recommend} from "@/utils/article"
import { reactive } from "vue";
import tool from "@/assets/tool";
let articleList = reactive([])
recommend(1).then((res:any)=>{
  console.log(res,"推荐");
  res=res.map((item:any)=>{
    item.cover=tool.baseURL+"/api"+item.cover
    return{
      ...item,
    }
  })
  articleList.push(...res)
  
  console.log(articleList);
  

})
</script>

<style scoped lang="scss">
.el-carousel__container{
  img{
    width: 100%;
    height: 100%;
  }
}
.el-carousel{
  border-radius: var(--radius-wrap);
}

.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>