<template>
    <Layout ></Layout>
 <router-view :key="route.fullPath"/>
</template>

<script setup lang="ts">
import Layout from '@/components/layout/index.vue'
import { useRouter, useRoute } from "vue-router"

const route = useRoute()
</script>

<!-- //css引用  -->
<link rel="stylesheet" href="https://font.sec.miui.com/font/css?family=MiSans:400,700:MiSans" />


<style  lang="scss">
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

