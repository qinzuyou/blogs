<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { reactive, ref, render } from 'vue'
import { typeArticle,searchArticle,labelArticle,uidArticle,getArticleType} from '@/utils/article'
import Tool from '@/assets/tool/index'
import Huge from '@/components/hugescreen/index.vue'

const props = defineProps({
  type: {
    type: String,
    default: 'null'
  },


  
})


let atype = useRoute().params.type
if (atype=="全部") atype="" 

let uId = useRoute().params.uid

let valType=ref("")

//文章类型
const classActive=ref(0)
const classList=reactive([{id:0,name:"全部"}])
const articleType=ref("")




const articleList = reactive([] as any[])
const pages = ref(1)
const size = ref(8)
const total = ref()

labelArticleVal()




//根据标签查询文章
function labelArticleVal() {
  labelArticle(pages.value, size.value, atype).then((res: any) => {
    console.log(res.records);
    total.value = res.total / size.value
    res.records = res.records.map((item: any) => {
      item.typeList = JSON.parse(item.typeList)
      item.labelList=JSON.parse(item.labelList)
      item.createTime = Tool.diaplayTime(item.createTime)


      // item.typeList = item.typeList.map((item2: any) => {

      //   let random = Math.random() * Tool.rgbaList.length
      //   return {
      //     name: item2,
      //     color: Tool.rgbaList[Math.floor(random)].color,
      //     bg: Tool.rgbaList[Math.floor(random)].bg
      //   }
      // })
      let random = Math.random() * Tool.rgbaList.length
      item.typeName={
        name:item.typeName,
        color: Tool.rgbaList[Math.floor(random)].color,
          bg: Tool.rgbaList[Math.floor(random)].bg
      }

      return {
        ...item,
        portrait: Tool.baseImg + item.portrait,
        cover: Tool.baseURL+"/api" + item.cover
      }
    })
    // articleList.push(0)

    articleList.splice(0)
    articleList.push(...res.records)

    loading.value=false
    if(articleList.length==0) nullLoading.value=true


    console.log(res.records, 11, articleList);

  })
}







function pchange(e: any) {
  pages.value = e
  labelArticleVal()

 

}

const router = useRouter();

function toArticle(aid:any){
  router.push("/article/"+aid)
}

let nullLoading=ref(false)

let loading=ref(true)


getArticleType().then((res:any)=>{
    classList.push(...res)
    console.log(res);
    
})


// function classCut(index:any){
//   classActive.value=index
//   articleType.value=classList[index].name
//   uidArticleVal()
//   // router.push(`/articleList/${articleType.value}/`)
//   // console.log(articleType.value);
  
// }

</script>
<template>


  <div class="article-list-box">

    <!-- <ul class="classify" v-if="false">
        <li :class="{'class-active':classActive==index}"  v-for="(item,index) in classList" :key="index" @click="classCut(index)">
          {{item.name}}
        </li>
      </ul> -->
  


    <transition mode="out-in" name="item-in2">
    <ul class="article-l-content" v-if="articleList.length !=0">
      <transition-group name="item-in" >
      
    
        <li class="article-item" v-for="(item, index) in articleList" :key="index">
          <div class="article-top"  @click="toArticle(item.aid)">
            <img :src="item.cover" alt="">
          </div>
          <p class="article-title">{{ item.title }}</p>
          <ul class="type-list">
            <!-- <li v-for="(item2, index2) in item.typeList" :key="index2" :style="{ background: item2.bg }">
              <svg-icon iconName="icon-bianjiwenzhang_huaban" :color="item2.color"></svg-icon>
              <span :style="{ color: item2.color }">{{ item2.name }}</span>
            </li> -->
            <li  :style="{ background: item.typeName.bg }">
              <svg-icon iconName="icon-bianjiwenzhang_huaban" :color="item.typeName.color"></svg-icon>
              <span :style="{ color: item.typeName.color }">{{ item.typeName.name }}</span>
            </li>

            <li v-for="(item2,index2) in item.labelList" :key="index2" class="label-item">
              #{{item2}}
            </li> 
          </ul>
          <div class="article-bottom">
            <div class="a-b-l">
              <img src="@/assets/images/2.jpg" alt="">
              <div>
                <span>{{ item.nickname }}</span>
                <span>{{item.createTime}}</span>
              </div>

            </div>
            <div class="a-b-r">
              <div>
                <svg-icon iconName="icon-liuyan" color="#999"></svg-icon>
                <span>{{item.commentCount}}</span>
              </div>
              <div>
                <svg-icon iconName="icon-yanjing" color="#999"></svg-icon>
                <span>{{item.hits}}</span>
              </div>
              <div>
                <svg-icon iconName="icon-good" color="#999"></svg-icon>
                <span>0</span>
              </div>
            </div>

          </div>

        </li>

      </transition-group>

    </ul>
   
    <div class="articleNull" v-else-if="nullLoading" >
      <img src="/public/state/null.png" alt="">
    </div> 
   
  </transition>
    <div class="pagecat">
      <el-pagination background layout="prev, pager, next" :total="total * 10" @current-change="pchange" />
    </div>
  </div>

   
</template>



<style lang="scss" scoped>
.article-list-box{
  max-width: 1340px;
  // padding: 10px;
  margin: 0 auto;
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


.loadingList{
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  // grid-template-rows: 366px 366px 366px 366px;
  margin-top: 10px;
}
.el-skeleton{
  background: #fff;
}

.articleNull{
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--main-bg-color);
    box-shadow: 0 8px 16px -4px rgba(44, 45, 48, 0.0470588235);
    border: 0 8px 16px -4px rgba(44, 45, 48, 0.0470588235);
    border-radius: 12px;
    padding: 20px;
    img{
      width: 200px;
      height: 200px;
    }
}
.label-item{
  border-radius: 2px;
    background: var(--classB);
    color: var(--main-color) !important;
    display: flex;
    align-items: center;
    padding: 4px;
    margin-right: 10px;
}
.item-in-enter-active {
  -webkit-animation: fade-in-bottom 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  animation: fade-in-bottom 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

.item-in-leave-active {
  -webkit-animation: fade-out-bottom 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: fade-out-bottom 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}


.item-in2-enter-active {
  -webkit-animation: fade-in-bottom 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  animation: fade-in-bottom 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

.item-in2-leave-active {
 display: none;
}

.pagecat {
  display: flex;
  justify-content: center;
  padding: 20px;

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

.article-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .a-b-l {
    display: flex;
    align-items: center;
    // color: #999;
    color: var(--main-color);

    div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 14px;
      margin-left: 10px;



      span:nth-child(2) {
        margin-top: 6px;
      }
    }

  }

  .a-b-r {
    display: flex;

    div {
      margin-left: 10px;

      span {
        margin-left: 4px;

        font-size: 14px;
        color: #999;
      }
    }
    div:nth-child(1){
      @media screen and (max-width :550px) {
          display: none;
      }
    }
    div:nth-child(3){
      @media screen and (max-width :580px) {
          display: none;
      }
    }
  }
}

.article-l-content {
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  // grid-template-rows: 366px 366px 366px 366px;
  margin-top: 10px;


  // align-items: start;
  // justify-content: space-between;
  // grid-row-gap: 20px;

  @media screen and (max-width:1024px) {
  grid-template-columns: repeat(3, 1fr);
    
  }
  @media screen and (max-width:1124px) {
  grid-template-columns: repeat(3, 1fr);
    
  }
  @media screen and (max-width:850px) {
  grid-template-columns: repeat(2, 1fr);
    
  }

  .article-item {
    
    box-shadow: 0 0 10px var(--main-shadow);
    transition: .3s ease-in-out;
    background: var(--header-bg);
    height:fit-content;
    border-radius: 8px;
    cursor: pointer;

  }

  .article-top:hover.article-top>img {
    transform: scale(1.1, 1.1);
  }

  .article-top {
    overflow: hidden;
    height: 225px;
    border-radius: 8px 8px 0 0;
    position: relative;

    img {

      width: 100%;
      height: 100%;
      cursor: pointer;
      transition: .3s;

    }

  }

  .article-top::before {
    content: "";
    opacity: 0;
    transition: .3s ease-in-out;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(41, 151, 247, .2);
  }

  .article-item:hover .article-top::before {
    opacity: 1;
  }

  .article-item:hover {
    box-shadow: 0 0 10px #aba8a8;
  }

  .article-title {
    padding: 10px;

    font-size: 16px;
    font-weight: 600;
    height: 40px;
    cursor: pointer;
    transition: .3s;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: var(--main-color);
  }
  ::-webkit-scrollbar {
    width: 5px;
     height: 4px; 
}
  .type-list {
    display: flex;
    width:100%;
    padding: 4px 10px;
  overflow: hidden;
  overflow-x: auto;
  white-space: nowrap;

    li {
      display: inline-block;

      font-size: 14px;
      margin-right: 10px;
      padding: 6px 8px;
      border-radius: 4px;

      color: #2997f7;
      cursor: pointer;
      transition: .3s;

      span {
        margin-left: 4px;
      }
    }
  }
}
</style>