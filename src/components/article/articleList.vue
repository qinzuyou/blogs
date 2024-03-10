<template>
  <div class="article-list">
    <ul class="list">
      <transition-group name="item-in">
        <li class="list-1" @click="toArticle(item.aid)" v-for="(item, index) in articleList" :key="item.aid">
          <div class="img-left">
            <img :src="item.bg.cover" alt="" v-if="((index + 1) % 2) == 0">
            <img :src="item.cover" alt="" v-else>
          </div>
          <div class="img-right">
            <img :src="item.bg.cover" alt="" v-if="((index + 1) % 2) != 0">
            <img :src="item.cover" alt="" v-else>
          </div>
          <div class="list-title">
            <div class="list-title-1">
              <h1>{{ item.title }}</h1>
              <div class="title-content">
                <p>
                  {{ item.introduce }}
                </p>
              </div>
              <div class="title-bottom">
                <ul>
                  <li>
                    <svg-icon iconName="icon-rili" class="sous-icon" color="#000"></svg-icon>
                    <i>{{ item.createTime }}</i>
                  </li>
                  <li>
                    <svg-icon iconName="icon-huoyandaping" class="sous-icon" color="#000"></svg-icon>
                    <i>{{ item.hits }}阅读</i>
                  </li>
                  <li>
                    <svg-icon iconName="icon-pinglun2" class="sous-icon" color="#000"></svg-icon>
                    <i>{{ item.commentCount }}评论</i>
                  </li>
                </ul>
                <div class="list-type">
                  <svg-icon iconName="icon-wenjianjia" class="sous-icon" color="#000"></svg-icon>
                  <i>{{ item.typeName }}</i>

                </div>
              </div>
            </div>
          </div>

        </li>
      </transition-group>

    </ul>
   
    <transition>
    <div class="load-more" @click="addArticle" v-if="noArticle">
      查看更多
    </div>
</transition>
    <Hint :title="hint" :titlees="hintIn"></Hint>
  </div>
</template>

<script setup lang="ts">
import { router } from '@/routers'
import { useRouter, useRoute } from "vue-router";
import { reactive, ref } from 'vue'
import { getArticleList, getListPage, typeArticle } from '@/utils/article'
import {typeWallpaper,oneWallpaper} from '@/utils/wallpaper.ts'
import Tool from '@/assets/tool/index'
import Hint from '@/components/qz/hint/index.vue'
import { ElMessage } from 'element-plus'


//壁纸列表
let wallpaperList=reactive([])

typeWallpaper(1,50,null).then((res:any)=>{
      res=res.records.map((item:any)=>{
        item.cover=Tool.baseURL+"/api"+item.cover
        return{
          ...item
        }
      })

      wallpaperList.push(...res)
})

//警告信息
let hint = ref("没有更多了！")
let hintIn = ref(false)

function HintOut() {
  setTimeout(() => {
    hintIn.value = false
  }, 1200)

}

let articleList = reactive([] as any[])

const route = useRoute()

const routers = useRouter()

const props = defineProps({
  data: {
    type: Array,
    default: 'null'
  },

})

let newPage = ref(0)
let strip = ref(4)

let noArticle=ref(true)

function addArticle() {
  newPage.value += 1
  typeArticle(newPage.value, strip.value, '').then((res: any) => {
      console.log(res,"kkkk");
      
    if (res.records.length != 0) {
      res.records = res.records.map((item: any) => {
        item.typeList = JSON.parse(item.typeList)

        

        item.createTime = Tool.diaplayTime(item.createTime)

        let sjs = Math.floor(Math.random() * wallpaperList.length)



        return {
          ...item,
          cover: Tool.baseURL + "/api" + item.cover,
          bg:wallpaperList[sjs]
        }
      })

      articleList.push(...res.records)
      console.log(articleList,"列表9999999999999");

    } else {
      // hintIn.value = true
      ElMessage.warning("没有更多了")
      noArticle.value=false
      

    }



  }).catch((err: any) => {
    console.log(err);

  })
}


addArticle()
// articleList.push(props.data)




console.log(props.data, "文章list");




const toArticle = function (id: any) {
  router.push('/article/' + id)
}
</script>

<style scoped lang="scss">


.load-more {

  margin: 0 auto;
  margin-top: 20px;
  border-radius: 16px;

  width: 120px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  background: var(--background);
  color: var(--routine);
  box-shadow: var(--box-shadow);
}

.article-list {

  width: 100%;

  .list {

    width: 100%;
  }
}

.list-1 {
  margin-top: 30px;
  border-radius: var(--radius-wrap);
  overflow: hidden;
  display: flex;
  width: 100%;
  height: 230px;
  position: relative;
  box-shadow: var(--box-shadow);

  img {
    height: 230px;
    transition: .3s;

  }

  img:hover {
    cursor: pointer;
    transform: scale(1.1, 1.1);
  }

  .img-left {

    flex: 4;
    // @media screen and (max-width: 1024px) {
    //     display: none;
    // }

    img {
      width: 100%;
    }
  }

  .img-right {
    flex: 7;

    @media screen and (max-width:1024px) {

      // transform: skewX(8deg);
      display: none;
      flex: 0;



    }

    img {
      width: 100%;



    }
  }

  .list-title {

    @media screen and (max-width:1024px) {
      width: 100%;
      transform: skewX(0deg);
      right: 0;
      top: 0;
      backdrop-filter: blur(0px);
      background-color: rgba(0, 0, 0, .35)
    }

    position: absolute;
    height: 230px;
    width: 70%;
    right: -4%;
    top: 0;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(30px);
    transform: skewX(8deg);

    .list-title-1 {
      @media screen and (max-width:1024px) {
        padding: 20px;
      }

      height: 230px;
      transform: skewX(-8deg);
      color: #fff;
      padding: 20px 60px 20px 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title-content {
        display: -webkit-box;
        overflow: hidden;
        color: #fff;
        text-indent: 2em;
        line-height: 25px;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .title-bottom {
        display: flex;
        justify-content: space-between;

        i {
          margin-left: 2px;
        }

        ul {
          display: flex;

          li {
            margin-right: 10px;
            font-size: 14px;
          }
        }
      }

      .list-type {
        font-size: 14px;
      }

      h1 {
        overflow: hidden;
        /* margin-bottom: 30px; */
        color: #fff;
        text-overflow: ellipsis;
        font-weight: 700;
        font-size: 24px;
        line-height: 30px;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical
      }
    }


  }






}

.list-1:nth-child(2n) {


  .img-left {

    flex: 7;

    @media screen and (max-width:1024px) {
      flex: 0 !important;
      display: none;
    }

    img {
      width: 100%;
    }
  }

  .img-right {
    flex: 4;

    @media screen and (max-width:1024px) {
      display: block !important;
    }

    img {
      width: 100%;


    }
  }

  .list-title {
    position: absolute;
    height: 230px;
    width: 70%;
    left: -4%;
    top: 0;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(30px);
    transform: skewX(8deg);
    box-shadow: var(--box-shadow);

    @media screen and (max-width:1024px) {
      width: 100%;
      transform: skewX(0deg);
      right: 0;
      top: 0;
      left: 0;
      backdrop-filter: blur(0px);
      background-color: rgba(0, 0, 0, .35)
    }


    .list-title-1 {
      @media screen and (max-width:1024px) {
        padding: 20px;
      }

      height: 230px;
      transform: skewX(-8deg);
      color: #fff;
      padding: 20px 20px 20px 60px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title-content {
        display: -webkit-box;
        overflow: hidden;
        color: #fff;
        text-indent: 2em;
        line-height: 25px;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .title-bottom {
        display: flex;
        justify-content: space-between;

        i {
          margin-left: 2px;
        }

        ul {
          display: flex;

          li {
            margin-right: 10px;
            font-size: 14px;
          }
        }
      }

      .list-type {
        font-size: 14px;
      }

      h1 {
        overflow: hidden;
        /* margin-bottom: 30px; */
        color: #fff;
        text-overflow: ellipsis;
        font-weight: 700;
        font-size: 24px;
        line-height: 30px;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical
      }
    }
  }
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