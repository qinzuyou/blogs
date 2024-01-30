<template>
  <div class="article-list">
    <ul class="list">
      <li class="list-1" @click="toArticle(item.aid)" v-for="(item, index) in articleList[0][0]">
        <div class="img-left">
          <img src="@/assets/images/2.jpg" alt="" v-if="((index + 1) % 2) == 0">
          <img :src="item.cover" alt="" v-else>
        </div>
        <div class="img-right">
          <img src="@/assets/images/2.jpg" alt="" v-if="((index + 1) % 2) != 0">
          <img :src="item.cover" alt="" v-else>

        </div>
        <div class="list-title">
          <div class="list-title-1">
            <h1>{{ item.title }}</h1>
            <div class="title-content">
              <p>
                偶然发现小米官网的字体无防盗链
                可以直接使用，而且小米还储存了思源宋体为什么用别人的字体？本地储存字体加载起来很慢，自己服务器慢的话那就可想而知了，所以我们可以利用小米官网储存的字体加速，看链接就知道这是小米官网，放心使用~链接中的400，600，700
                可以去除其中一个，分别对应字体的粗细，看自己需求演示站：
              </p>
            </div>
            <div class="title-bottom">
              <ul>
                <li>
                  <svg-icon iconName="icon-shouye1" class="sous-icon" color="#000"></svg-icon>
                  <i>5天前</i>
                </li>
                <li>
                  <svg-icon iconName="icon-shouye1" class="sous-icon" color="#000"></svg-icon>
                  <i>0阅读</i>
                </li>
                <li>
                  <svg-icon iconName="icon-shouye1" class="sous-icon" color="#000"></svg-icon>
                  <i>0评论</i>
                </li>
              </ul>
              <div class="list-type">
                <svg-icon iconName="icon-shouye1" class="sous-icon" color="#000"></svg-icon>
                <i>技术素材</i>

              </div>
            </div>
          </div>
        </div>

      </li>

      <!-- <li class="list-1">
        <div class="img-right">
          <img src="@/assets/images/1.jpg" alt="">
        </div>
        <div class="img-left">
          <img src="@/assets/images/2.jpg" alt="">
        </div>



        <div class="list-title">
          <div class="list-title-1">
            <h1>标题</h1>
            <div class="title-content">
              <p>
                偶然发现小米官网的字体无防盗链
                可以直接使用，而且小米还储存了思源宋体为什么用别人的字体？本地储存字体加载起来很慢，自己服务器慢的话那就可想而知了，所以我们可以利用小米官网储存的字体加速，看链接就知道这是小米官网，放心使用~链接中的400，600，700
                可以去除其中一个，分别对应字体的粗细，看自己需求演示站：
              </p>
            </div>
            <div class="title-bottom">
              <ul>
                <li>
                  <svg-icon iconName="icon-shouye1" class="sous-icon" color="#000"></svg-icon>
                  <i>5天前</i>
                </li>
                <li>
                  <svg-icon iconName="icon-shouye1" class="sous-icon" color="#000"></svg-icon>
                  <i>0阅读</i>
                </li>
                <li>
                  <svg-icon iconName="icon-shouye1" class="sous-icon" color="#000"></svg-icon>
                  <i>0评论</i>
                </li>
              </ul>
              <div class="list-type">
                <svg-icon iconName="icon-shouye1" class="sous-icon" color="#000"></svg-icon>
                <i>技术素材</i>

              </div>
            </div>
          </div>
        </div>

      </li> -->

    </ul>

    <div class="load-more" @click="addArticle">
      查看更多
    </div>

    <Hint :title="hint" :titlees="hintIn"></Hint>
  </div>
</template>

<script setup lang="ts">
import { router } from '@/routers'
import { useRouter, useRoute } from "vue-router";
import { reactive,ref } from 'vue'
import {getArticleList,getListPage,typeArticle} from '@/utils/article'
import Tool from '@/assets/tool/index'
import Hint from '@/components/qz/hint/index.vue'

//警告信息
let hint=ref("没有更多了！")
let hintIn=ref(false)

function HintOut(){
  setTimeout(()=>{
        hintIn.value=false
  },1200)
  
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

let newPage=ref(1)
let strip=ref(4)

function addArticle(){
  newPage.value+=1
  typeArticle(newPage.value,strip.value,'').then((res:any)=>{

      if(res.records.length!=0){
         res.records=res.records.map((item:any)=>{
                    item.typeList= JSON.parse(item.typeList)


                    

                return{
                    ...item,
                    cover:Tool.baseURL+"/api/upload/"+item.cover
                }
            })

            articleList[0][0].push(...res.records)
            console.log(articleList);
            
      }else{
        hintIn.value=true
        HintOut()
      }
               
               
                
        }).catch((err:any)=>{
            console.log(err);
            
        })
}



articleList.push(props.data)




console.log(props.data, "文章list");




const toArticle = function (id:any) {
  router.push('/article/'+id)
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

    img {
      width: 100%;
    }
  }

  .img-right {
    flex: 7;

    img {
      width: 100%;


    }
  }

  .list-title {

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
      height: 190px;
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

  .list-title2 {
    position: absolute;
    height: 230px;
    width: 70%;
    left: -4%;
    top: 0;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(30px);
    transform: skewX(8deg);

    .list-title-1 {
      height: 190px;
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

.list-1:nth-child(2n) {

  .img-left {

    flex: 7;

    img {
      width: 100%;
    }
  }

  .img-right {
    flex: 4;

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


    .list-title-1 {
      height: 190px;
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
}</style>