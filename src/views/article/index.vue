<script setup lang="ts">
import Huge from '@/components/hugescreen/index.vue'
import STitle from '@/components/title/sidebarTitle.vue'
import Comment from '@/components/comment/index.vue'
import { ref, reactive, shallowRef, onBeforeUnmount, onMounted, onUnmounted, provide } from 'vue';
import Qzbutton from '@/components/qz/button/index.vue'
import { getArticleList, getListPage, getArticleId, aidArticle, aidComment, aidCommentCount, articleNext, typeArticle, articlePrevious, addHits, uidArticle, uidLabel, commentCount } from '@/utils/article'
import { userInfo } from "@/utils/user"
import Tool from '@/assets/tool/index'
import Hint from '@/components/qz/hint/index.vue'
import { router } from '@/routers'
import { useRouter, useRoute } from "vue-router";
import Catalogue from "@/components/article/catalogue.vue"
import axios from 'axios'
import CommentList from "@/components/comment/commetList.vue"
import { useGlobalStore } from "@/stores/index"
import Sidebar from "@/components/sidebar/index.vue"

import Cookies from 'js-cookie';
//wang-editor
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
const editorRef = shallowRef()
const mode = 'default'
const store = useGlobalStore()
//设置富文本为只读模式
const valueHtml: any = ref("")
const toolbarConfig = {}
// const editorConfig = { placeholder: '请输入内容...' }
const editorConfig = { readOnly: true }
const handleChange = (editor: any) => {
  console.log('change:', editor.getHtml());
};

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

//文章id
let aId = useRoute().params.id

let article: any = ref({})


addRead()
//增加阅读量
function addRead() {

  console.log(Cookies.get('hits'));

  if (Cookies.get('hits')) {

  } else {
    addHits(aId).then(() => {
      var inFifteenMinutes = new Date(new Date().getTime() + 1 * 30 * 1000);

      Cookies.set('hits', aId, { expires: inFifteenMinutes });

    })



  }

}


// onMounted(()=>{
//   valueHtml.value=""
// })
//警告信息
let hint = ref("没有更多了！")
let hintIn = ref(false)

function HintOut() {
  setTimeout(() => {
    hintIn.value = false
  }, 1200)

}


//文章作者信息



let userContent: any = reactive({
  nickName: '',
  motto: '',
  uid:0,
  portrait: '',
  labelCount: 0,
  articleCount: 0,
  commentCount: 0,
  articleList: [],
  recommendList: [],


})


//获取文章
aidArticle(aId).then((res: any) => {
  console.log(res, 88);
  res.createTime = Tool.DateFormatPipe(res.createTime, "yyyy-MM-dd")
  res.portrait = Tool.baseImg + res.portrait
  res.cover = Tool.baseImg + res.portrait
  res.typeList = JSON.parse(res.typeList)
  article.value = res
  // console.log(article.value,'11');

  userInfo(article.value.uid).then((res: any) => {
    userContent.nickName = res.nickname
    userContent.pointer = res.pointer
    userContent.uid = res.uid
    if(res.motto){
      userContent.motto = res.motto

    }else{
    userContent.motto = "这个人很懒。"

    }

    console.log(res,'9999999');
    

  })


  uidArticle(1, 2, article.value.uid).then((res: any) => {


    userContent.articleCount = res.total
    userContent.articleList = res.records


  })
  uidLabel(1, 1, article.value.uid).then((res: any) => {

    userContent.labelCount = res.length

  })
  commentCount(1, 3, article.value.uid).then((res: any) => {
    userContent.commentCount = res.total

  })

  typeArticle(1, 3, article.value.typeName).then((res: any) => {
    console.log(res, 'llllll');

    userContent.recommendList = res.records
  })




  if (article.value.content == null) {
    valueHtml.value = "暂无内容"
  } else {
    valueHtml.value = article.value.content
  }


}).catch((err: any) => {
  console.log(err);

})




//表情包处理
let memeList = ["蛆音娘", "阿鲁", "贴吧泡泡", "B站", "微博", "颜文字"]
// 表情包
let Bzhan = reactive([] as any[])
let Quyin = reactive([] as any[])
let Alu = reactive([] as any[])
let Weibo = reactive([] as any[])
let Tieba = reactive([] as any[])
let Yanwen = reactive([] as any[])
let memeType = ref('蛆音娘')

async function getMeme() {
  let res: any = await axios({
    method: 'get',
    url: '/emotion/OwO.json'

  })
  console.log(res.data);

  Bzhan.push(...res.data.B站.container)
  Alu.push(...res.data.阿鲁.container)
  Weibo.push(...res.data.微博.container)
  Tieba.push(...res.data.贴吧.container)
  Quyin.push(...res.data.蛆音娘.container)
  Yanwen.push(...res.data.颜文字.container)

}
getMeme()

//图片替换支付
function imgReplace(content: any) {

  for (let bz of Bzhan) {
    content = content.replaceAll('@@' + bz.text, `<img class="emojiImg" src="/emotion/BZ/${bz.icon}.png" />`)
  }
  for (let bz of Alu) {
    content = content.replaceAll('&&' + bz.text, `<img class="emojiImg" src="/emotion/aru/${bz.icon}.png" />`)
  }
  for (let bz of Weibo) {
    content = content.replaceAll('%%' + bz.text, `<img class="emojiImg" src="/emotion/weibo/${bz.icon}.png" />`)
  }
  for (let bz of Tieba) {
    content = content.replaceAll('##' + bz.text, `<img class="emojiImg" src="/emotion/paopao/${bz.icon}.png" />`)
  }
  for (let bz of Quyin) {
    content = content.replaceAll('::' + bz.text, `<img class="emojiImg" src="/emotion/quyin/${bz.icon}.png" />`)
  }
  return content
}

//获取文章评论数量
let CommentCount: any = ref(0)
function getCommentCount() {
  aidCommentCount(1, 1, aId).then((res: any) => {
    CommentCount.value = res.total
  })
}

getCommentCount()
//获取文章评论
let commentList: any = reactive([] as any[])

function getComment() {
  aidComment(aId).then((res: any) => {
    console.log(res, 88);

    res = res.map((item: any) => {

      item.info = JSON.parse(item.info)
      item.imgList = item.imgList.split(",");
      item.createTime = Tool.DateFormatPipe(item.createTime, "yyyy年MM月dd日HH:mm:ss")

      item.content = imgReplace(item.content)


      item.replyList = item.replyList.map((item2: any) => {
        item2.info = JSON.parse(item2.info)
        item2.imgList = item2.imgList.split(",");
        item2.createTime = Tool.DateFormatPipe(item2.createTime, "yyyy年MM月dd日HH:mm:ss")
        item2.content = imgReplace(item2.content)
        if (item2.imgList != "") {
          item2.imgList = item2.imgList.map((item3: any) => {
            return Tool.baseURL + "/api" + item3
          })

        } else {
          item2.imgList = ""
        }

        return {
          ...item2
        }

      })

      if (item.imgList != "") {
        item.imgList = item.imgList.map((item2: any) => {
          return Tool.baseURL + "/api" + item2
        })

      } else {
        item.imgList = ""
      }




      return {
        ...item,
      }

    })
    console.log(res, "文章评论");
    commentList.splice(0)
    commentList.push(res)

  }


  )
}
getComment()

provide('getComent', ref(11111111111111))

// fetch('https://q.qlogo.cn/headimg_dl?dst_uin=1791331360&spec=640&img_type=jpg')
// fetch('/assets/emotion/OwO.json')



let cataTop = ref(false)


console.log(aId);

let aContent = ref()


//目录滚动固定
const handleScroll = () => {
  if (document.documentElement.scrollTop > 900) {
    cataTop.value = true
  } else {
    cataTop.value = false
  }
  //往下滑超过20则显示 否则则不显示按钮
}

onMounted(() => {


  window.addEventListener('scroll', handleScroll)
})//监听滚动事件
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})//离开页面时移除监听事件

let previousData: any = ref("")

let NextData: any = ref("")

previous()
Next()
//上一篇
function previous() {
  articlePrevious(aId).then((res: any) => {
    console.log(6666, res, "上一篇");

    if (res == 1) {

    } else {

      res.cover = Tool.baseURL + "/api" + res.cover
      previousData.value = res



    }

  })
}

//下一篇

function Next() {
  articleNext(aId).then((res: any) => {
    console.log(res, "下一篇");

    if (res == 1) {

    } else {
      res.cover = Tool.baseURL + "/api" + res.cover
      NextData.value = res
    }


  })


}



function toArticle(aid: any) {

  if (aid) {
    router.push(`/article/${aid}`)
  }

}

function toPage(path: any) {
  router.push(path)
}

function toType(val: any) {
  router.push({
    path: `/articleList/${val}`,
    state: {
      data: ""

    }
  })

}
</script>

<template>
  <div>

    <Huge :img="'/images/2.jpg'" :title="article.title"></Huge>

    <div class="article fade-in-bottom">
      <div class="article-left">
        <div class="article-top  article-shadow">


          <div class="article-nav">
            <ul>
              <li>
                <!-- <Transition mode="out-in"> -->
                
                  <svg-icon iconName="icon-shouye1" class="sous-icon" color="#fff" ></svg-icon>
                <!-- </Transition> -->
                <span @click="toPage('/')">
                  首页
                </span>
              </li>
              <li class="bias">/</li>
              <li @click="toType(article.typeName)">{{ article.typeName }}</li>
              <li class="bias">/</li>
              <li class="active">正文</li>
            </ul>
          </div>
          <p class="article-title">{{ article.title }}</p>
          <ul class="article-message">
            <li>{{ article.nickname }}</li>
            <li>{{ article.createTime }}</li>
            <li class="reading-quantity">
              <!-- <Transition mode="out-in"> -->
                <svg-icon iconName="icon-huoyandaping"></svg-icon>
           
              <!-- </Transition> -->
              <span>{{ article.hits }}</span>
            </li>

          </ul>
          <div class="article-content">
            <Editor v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" readOnly:
              true />
          </div>


        </div>
        <div class="comment-title article-shadow">
          <!-- <Transition mode="out-in"> -->
            <svg-icon iconName="icon-shequpinglun" class="icon-shequpinglun" ></svg-icon>
          
          <!-- </Transition> -->
          <p>评论<span>{{ CommentCount }}</span> </p>
        </div>



        <Comment @update-comment="getComment" @update-count="getCommentCount" :uid="article.uid"></Comment>

        <div class="article-next">
          <div class="previous" @click="toArticle(previousData.aid)">
            <img :src="previousData.cover" alt="" v-if="previousData">
            <img src="@/assets//images/1.jpg" alt="" v-else>

            <div class="previous-title" v-if="previousData">
              <p>上一篇</p>
              <p>{{ previousData.title }}</p>
            </div>
            <div class="previous-title" v-else>
              <p>没有上一篇了</p>

            </div>
          </div>
          <div class="next" @click="toArticle(NextData.aid)">

            <img :src="NextData.cover" alt="" v-if="NextData">
            <img src="@/assets/images/1.jpg" alt="" v-else>
            <div class="next-title" v-if="NextData">
              <p>下一篇</p>
              <p>{{ NextData.title }}</p>
            </div>

            <div class="next-title" v-else>
              <p>没有下一篇了</p>
            </div>

          </div>
        </div>
        <CommentList :uid="article.uid" :commentList="commentList" @update-comment="getComment" @update-count="getCommentCount">
        </CommentList>



      </div>

      <div class="article-right">
        <!-- <Sidebar></Sidebar> -->
        <div class="blog-user sidebar-shadow">
          <img class="blog-bg" src="@/assets/images/1.jpg" alt="">
          <img class="user-pic" src="@/assets/images/3.jpg" alt="">
          <p class="user-name">{{ userContent.nickName }}</p>
          <p class="user-lable">{{ userContent.motto }}</p>
          <ul class="user-pl">
            <li>
              <p>{{ userContent.articleCount }}</p>
              <p>文章数</p>
            </li>
            <li>
              <p>{{ userContent.labelCount }}</p>
              <p>标签数</p>
            </li>
            <li>
              <p>{{ userContent.commentCount }}</p>
              <p>评论量</p>
            </li>

          </ul>
          <ul class="user-bottom">
            <li v-for="(item, index) in userContent.articleList" :key="index" @click="toArticle(item.aid)">
              <p>{{ item.title }}</p>
              <svg-icon iconName="icon-huixingzhen" class="sous-icon" color="#000"></svg-icon>
            </li>
          </ul>
        </div>

        <!-- <div class="catalogue sidebar-shadow">
          <STitle :title="'目录'" :icon="'icon-shouye1'"></STitle>

          <div class="jj" id="kk">
            <h1>21321</h1>
            <h2>51251</h2>
          </div>
          <ul class="catalogue-list">
          </ul>
        </div> -->
        <div class="correlation sidebar-shadow">
          <STitle :title="'相关推荐'" :icon="'icon-zhifeiji'"></STitle>
          <ul class="correlation-list" v-if="userContent.recommendList.length != 0">
            <li v-for="(item, index) in userContent.recommendList" @click="toArticle(item.aid)">
              <p>{{ item.title }}</p>
              <p><span>{{ item.hits }}</span>阅读<span>·</span><span>0</span>点赞</p>
            </li>
          </ul>
          <ul class="correlation-list2" v-else>
            <li>暂无推荐</li>
          </ul>
        </div>

        <div class="catalogue-content" :class="{ 'cata-top': cataTop }">
          <Catalogue :container="'.article-content'"></Catalogue>

        </div>


      </div>
    </div>
  </div>
</template>



<style scoped lang="scss">
:deep(.w-e-text-container){
  transition: .3s;
}
.article-next {
  margin-top: 10px;
  display: flex;
  width: 100%;
  height: 150px;
  cursor: pointer;

  .previous {
    border-radius: 20px 0 0 20px;
    overflow: hidden;
    flex: 1;
    position: relative;

    .previous-title {
      border-radius: 20px 0 0 20px;
      transition: .3s;
      position: absolute;
      width: 100%;
      left: 0;
      background: rgba(0, 0, 0, 0.4);
      height: 100%;
      top: 0;
      display: flex;
      flex-direction: column;
      color: #fff;
      justify-content: center;
      padding: 40px;

      p:nth-child(2) {
        margin-top: 10px;
      }


    }

    img {
      transition: .3s;

      width: 100%;
      height: 100%;
    }
  }

  .previous:hover>img {
    transform: scale(1.1, 1.1);
  }

  .previous:hover>.previous-title {
    background: none;
  }

  .next {
    border-radius: 0 20px 20px 0;

    overflow: hidden;
    flex: 1;
    position: relative;

    .next-title {
      border-radius: 0 20px 20px 0;
      transition: .3s;
      position: absolute;
      width: 100%;
      left: 0;
      background: rgba(0, 0, 0, 0.4);
      height: 100%;
      top: 0;
      display: flex;
      flex-direction: column;
      color: #fff;
      justify-content: center;
      align-items: end;
      padding: 40px;

      p:nth-child(2) {
        margin-top: 10px;
      }

    }

    img {
      transition: .3s;

      width: 100%;
      height: 100%;
    }
  }

  .next:hover>img {
    transform: scale(1.1, 1.1);
  }

  .next:hover>.next-title {
    background: none;
  }
}

.cata-top {
  position: fixed;
  top: 60px;
  width: 260px;
}


.comment-content {
  padding: 15px;
  border: 1px solid #90939950;
  border-radius: 5px;
  margin-top: 20px;

  .comment-text {
    width: 100%;
    height: 130px;
    border: none;
    resize: none;
    color: var(--routine);
    background: transparent;
    font-size: 15px;
  }

  .comment-submit {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .com-submit {
    border-radius: 3px;
    height: 32px;
    line-height: 32px;
    padding: 0 15px;
    cursor: pointer;
    border: none;
    background: var(--theme-color);
    color: #fff;
    font-size: 14px;
    transition: .3s;
  }

  .com-submit:hover {
    opacity: 0.8;
  }

}

.comment-user {
  // width: 860px;
  margin-top: 20px;
  padding: 10px;
}

.com-user {
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  ul {
    display: flex;

    li {
      display: flex;
      white-space: nowrap;
      margin-left: 1rem;

      div {
        padding: 8px 1rem;
        border-radius: 5px 0px 0px 5px;
        background-color: rgba(144, 147, 153, 0.23);
        color: var(--main);
        font-size: 15px;
      }

      input {
        background: transparent;
        padding: 0 15px;
        border-radius: 0px 5px 5px 0px;
        border: 1px solid #90939950;
        color: var(--main-color);
        display: block;
        width: 100%;
        box-sizing: border-box
      }
    }
  }

}

.comment-title {
  margin-top: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  transition: .3s;
  color: var(--main-color);

  p {
    margin-left: 4px;
  }

  span {
    margin-left: 10px;
  }
}

.article-content {
  margin-top: 20px;
  color: var(--main-color) !important;
}

.active {
  color: var(--theme-color);
}

.article-message {
  margin-top: 10px;
  display: flex;

  li {
    margin-right: 20px;
    font-size: 15px;
    font-weight: 400;
    color: var(--main-color);
    transition: .3s;
  }

  .reading-quantity {
    display: flex;
    align-items: center;

    span {
      margin-left: 6px;
    }

  }
}

.article-title {
  color: var(--main-color);
  transition: .3s;
  font-size: 32px;
  font-weight: 700;
}

.article-nav {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--classB);
  transition: .3s;

  ul {
    color: var(--main-color);
    font-size: 18px;
    // transition: .3s;

    display: flex;

    li {
      transition: .3s;
    }

    li:nth-child(1) {
      display: flex;
      align-items: center;

      span {
        margin-left: 4px;
      }
    }

    li:hover {
      cursor: pointer;
      color: var(--theme-color);
    }

    .bias {
      margin: 0 6px;
    }
  }
}

.correlation {
  margin-top: 20px;
}

.correlation-list {
  padding: 10px;

  li {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    color: var(--main-color);


    p:nth-child(1) {
      font-size: 16px;
      transition: .3s;

    }

    p:nth-child(1):hover {
      color: var(--theme-color);
    }

    p:nth-child(2) {
      font-size: 14px;
      margin-top: 10px;
      color: var(--juejin-font-3);
      font-weight: 400;

      span:nth-child(1) {
        margin-right: 4px;
      }

      span:nth-child(3) {
        margin-right: 4px;
      }

      span:nth-child(2) {
        margin: 0 4px;
      }
    }
  }
}

.correlation-list2 {
  text-align: center;
  padding: 20px;
  color: var(--main-color);
  transition: .3s;
}

.catalogue {
  margin-bottom: 20px;

}

.catalogue-list {
  padding: 10px;
  max-height: 300px;
  overflow-y: auto;

  li {
    margin-top: 20px;
    cursor: pointer;
  }
}

.article-shadow {
  background: var(--main-bg-color);
  transition: .3s;
  border-radius: var(--radius-wrap);
  padding: 15px;
  box-shadow: var(--box-shadow);
}

.article {
  margin-top: 10px;
  display: flex;
  justify-content: center;

  .article-left {
    width: 860px;

    @media screen and (max-width: 1024px) {
      // display: none;

      margin: 10px;
    }
  }

  .article-right {
    width: 260px;
    margin-left: 20px;

    @media screen and (max-width: 1024px) {
      display: none;
    }
  }

}

.blog-user {

  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  position: relative;
  overflow: hidden;

  .user-pic {
    margin-top: 80px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    z-index: 2;
  }

  .blog-bg {
    position: absolute;
    width: 100%;
    height: 120px;
    top: 0;
    left: 0;
  }

  .user-name {

    margin-top: 20px;
    font-weight: 700;
    color: var(--theme-color);
    font-size: 16px;
  }

  .user-pl {
    margin-top: 20px;
    display: flex;

    li {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      font-size: 18px;
      transition: .3s;
      color: var(--main-color);

      p:nth-child(2) {
        color: var(--main-color);
        transition: .3s;
        margin-top: 4px;
        font-size: 14px;

      }
    }
  }


  .user-bottom {
    margin-top: 20px;
    margin-bottom: 30px;
    width: 100%;
    padding: 0 15px;


    li {

      margin-top: 6px;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      transition: .3s;

      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--main-color);
        transition: .3s;
        max-width: 85%;
      }
      p:hover{
        color: var(--theme-color) !important;

      }
      

    }

  }

  .user-lable {
    margin-top: 20px;
    font-size: 14px;
    color: var(--main-color);
    transition: .3s;
  }
}

.sidebar-shadow {
  background-color: var(--main-bg-color);
  border-radius: var(--radius-wrap);
  box-shadow: var(--box-shadow);
  transition: .3s;
  width: 100%;
}</style>