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
    console.log(res.records);
    res.records = res.records.map((item: any) => {
        item.typeList = JSON.parse(item.typeList)

        return {
            ...item,
            portrait: Tool.baseImg + item.portrait,
            cover: Tool.baseImg + item.cover
        }
    })

    articleList.push(res.records)

}).catch((err: any) => {
    console.log(err);

})

</script>
<template>
    <div>
        <Huge :img="'/images/2.jpg'" :title="'你好呀'"></Huge>
        <div class="home-content">
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
</template>
<style scoped lang="scss">
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
    }
}

.home-right {
    width: 260px;
}
</style>