<script setup lang="ts">
import Huge from '@/components/hugescreen/index.vue'
import {getArticleList,getListPage,getArticleId,getArticleType} from '@/utils/article'
import {ref,reactive} from "vue"
import ArticleList2 from "@/components/article/articleList2.vue"
import { useRouter, useRoute } from "vue-router";
const classActive=ref(0)
const classList=reactive([{id:0,name:"全部"}])
const articleType=ref("")

let router = useRouter()
let atype=useRoute().params.type

function classCut(index:any){
  classActive.value=index
  articleType.value=classList[index].name
  router.push(`/articleList/${articleType.value}/`)
  console.log(articleType.value);
  
}

getArticleType().then((res:any)=>{
    classList.push(...res)
    console.log(res);
    
})
let typeVal=ref(true)
if(history.state.data){
typeVal.value=false
}


</script>
<template>
  <div>
    <Huge :img="'/images/2.jpg'" :title="'文章列表'"></Huge>
  
    <div class="article-list" >
      <ul class="classify " v-if="typeVal">
        <li :class="{'class-active':item.name==atype}"  v-for="(item,index) in classList" :key="index" @click="classCut(index)">
          {{item.name}}
        </li>
      </ul>

      <ArticleList2 :type="articleType"></ArticleList2>
    </div>


  </div>
</template>



<style scoped lang="scss">

.article-list {
 max-width: 1340px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 0 20px;
  @media screen and (max-width: 1024px) {
          width: 100%;
          padding: 0 6px;


    }
.classify{
  display: flex;
  background: var(--main-bg-color);
  box-shadow:  0 8px 16px -4px #2c2d300c;
  border:  0 8px 16px -4px #2c2d300c;
  border-radius:12px;
  padding: 20px;

  
  li{
    padding: 8px  12px;
    margin-right: 10px;
    transition: .3s;
    cursor: pointer;
    border-radius: 8px;
    color: var(--main-color);
  }
  li:hover{
    color: #fff;
   background: var(--theme-color);

  }
}
.class-active{
  background: var(--theme-color);
  color: #fff !important;
 
}

}
</style>