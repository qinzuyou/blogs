<script setup lang="ts">
import Huge from '@/components/hugescreen/index.vue'
import Carousel from '@/components/carousel/index.vue'
import ArticleList from '@/components/article/articleList.vue'
import Sidebar from '@/components/sidebar/index.vue'

import { ref, reactive } from 'vue'
import { getArticleList, getListPage, typeArticle } from '@/utils/article'
import Tool from '@/assets/tool/index'

let articleList = reactive([] as any[])


typeArticle(1, 4, '').then((res: any) => {
    console.log(res);
    res.records = res.records.map((item: any) => {
        item.typeList = JSON.parse(item.typeList)
        item.createTime = Tool.diaplayTime(item.createTime)
        return {
            ...item,
            portrait: Tool.baseImg + item.portrait,
            cover: Tool.baseURL + "/api" + item.cover
        }
    })

    articleList.push(res.records)

}).catch((err: any) => {
    console.log(err);

})

</script>
<template>
    <div>
        <Huge :img="'/images/2.jpg'" :title="'天地者，万物之逆旅；光阴者，百代之过客'"></Huge>
       
        <div class="home-content fade-in-bottom">
            <div class="home-left">

            </div>
          
            <div class="home-center">
                <Carousel></Carousel>
                <ArticleList :data="articleList"></ArticleList>


            </div>

            <div class="home-right">
                <Sidebar></Sidebar>
            </div>
        </div>
  
    </div>
    <footer></footer>
</template>
<style scoped lang="scss">

.item-in-enter-active {
  -webkit-animation: fade-in-bottom 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  animation: fade-in-bottom 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

.item-in-leave-active {
  -webkit-animation: fade-out-bottom 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: fade-out-bottom 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
//自适应

.home-content {
    position: relative;
    z-index: 2;
    display: flex;
    width: 100%;
    margin: 0 auto;
    padding-top: 30px;
    // box-shadow: -100px 0px 100px rgba(255, 255, 255, 1);
    justify-content: center;

   


    .home-center {
        width: 860px;
        margin: 0 20px;
        @media screen and (max-width: 1024px) {
          width: 100%;
        margin: 0 6px;

    }
    }
}

.home-right {
    width: 260px;

    @media screen and (max-width: 1024px) {
            display: none;
    }
}
</style>