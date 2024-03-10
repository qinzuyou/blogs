<template>
  <div class="page404">
    <img src="/public/images/2.jpg" alt="">
    <h1>您访问的页面不存在！</h1>
  </div>
</template>

<script setup lang="ts">
import Huge from '@/components/hugescreen/index.vue'

</script>

<style scoped lang="scss">
.page404{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  h1{
    position: relative;
    z-index: 5;
    font-weight: 700;
    color: #fff;
    text-align: center;
    text-shadow: 0 0.1875rem 0.3125rem #1c1f21;
    font-size: 2em;
  }
  img{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
  }
}
</style>