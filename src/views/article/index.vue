<script setup lang="ts">
import Huge from '@/components/hugescreen/index.vue'
import STitle from '@/components/title/sidebarTitle.vue'
import Comment from '@/components/comment/index.vue'
import { ref, reactive,shallowRef,onBeforeUnmount,onMounted,onUnmounted} from 'vue';
import Qzbutton from '@/components/qz/button/index.vue'
import {getArticleList,getListPage,getArticleId,aidArticle,aidComment} from '@/utils/article'
import Tool from '@/assets/tool/index'
import Hint from '@/components/qz/hint/index.vue'
import { router } from '@/routers'
import { useRouter, useRoute } from "vue-router";
import Catalogue from "@/components/article/catalogue.vue"
import axios from 'axios'
import  CommentList from "@/components/comment/commetList.vue"
//wang-editor
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
const editorRef = shallowRef()
const mode = 'default'

//设置富文本为只读模式
const valueHtml:any= ref("")
const toolbarConfig = { }
// const editorConfig = { placeholder: '请输入内容...' }
const editorConfig = { readOnly: true }
const handleChange = (editor:any) => {
      console.log('change:', editor.getHtml());
    };

    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })
const handleCreated = (editor:any) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    // onMounted(()=>{
    //   valueHtml.value=""
    // })
//警告信息
let hint=ref("没有更多了！")
let hintIn=ref(false)

function HintOut(){
  setTimeout(()=>{
        hintIn.value=false
  },1200)
  
}

//文章id
let aId=useRoute().params.id

let article:any=ref({})

//获取文章
aidArticle(aId).then((res:any)=>{
      console.log(res,88);
      res.createTime=Tool.DateFormatPipe(res.createTime,"yyyy-MM-dd")
      res.portrait=Tool.baseImg+res.portrait
      res.cover=Tool.baseImg+res.portrait
      article.value=res
      // console.log(article.value,'11');
      
     
   
      

  if(article.value.content==null){
    valueHtml.value="暂无内容"
  }else{
    valueHtml.value=article.value.content
  }
      
      
}).catch((err:any)=>{
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
//获取文章评论
let commentList :any= reactive([] as any[])

function getComment(){
  aidComment(aId).then((res: any) => {
  console.log(res,88);
  
  res=res.map((item:any)=>{

    item.info=JSON.parse(item.info)
    item.imgList=item.imgList.split(",");
    item.createTime=Tool.DateFormatPipe(item.createTime,"yyyy年MM月dd日HH:mm:ss")

    for(let bz of Bzhan){
      item.content=item.content.replaceAll('@@'+bz.text,`<img class="emojiImg" src="/emotion/BZ/${bz.icon}.png" />`)
    }
    for(let bz of Alu){
      item.content=item.content.replaceAll('&&'+bz.text,`<img class="emojiImg" src="/emotion/aru/${bz.icon}.png" />`)
    }
    for(let bz of Weibo){
      item.content=item.content.replaceAll('%%'+bz.text,`<img class="emojiImg" src="/emotion/weibo/${bz.icon}.png" />`)
    }
    for(let bz of Tieba){
      item.content=item.content.replaceAll('##'+bz.text,`<img class="emojiImg" src="/emotion/paopao/${bz.icon}.png" />`)
    }
    for(let bz of Quyin){
      item.content=item.content.replaceAll('::'+bz.text,`<img class="emojiImg" src="/emotion/quyin/${bz.icon}.png" />`)
    }

  
    


    if(item.imgList!=""){
       item.imgList=item.imgList.map((item2:any)=>{
      return Tool.baseURL+"/api"+item2
    })
      
    }else{
      item.imgList=""
    }
   

  

    return{
      ...item,
    }

  })
  console.log(res,"文章评论");
  commentList.splice(0)
  commentList.push(res)

}


)
}
getComment()


// fetch('https://q.qlogo.cn/headimg_dl?dst_uin=1791331360&spec=640&img_type=jpg')
// fetch('/assets/emotion/OwO.json')



let cataTop=ref(false)


console.log(aId);

let aContent=ref()


//目录滚动固定
const handleScroll = () => {
    if (document.documentElement.scrollTop > 900) {
      cataTop.value=true
    } else {
      cataTop.value=false
    }
    //往下滑超过20则显示 否则则不显示按钮
  }

onMounted(() => {


  window.addEventListener('scroll', handleScroll)
})//监听滚动事件
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})//离开页面时移除监听事件

</script>

<template>
  <div>
    
    <Huge :img="'/images/2.jpg'" :title="'你好呀'"></Huge>

    <div class="article">
      <div class="article-left">
        <div class="article-top  article-shadow">


          <div class="article-nav">
            <ul>
              <li>
                <svg-icon iconName="icon-search" class="sous-icon" color="#000"></svg-icon>
                <span>
                  首页
                </span>
              </li>
              <li class="bias">/</li>
              <li>网站文档</li>
              <li class="bias">/</li>
              <li class="active">正文</li>
            </ul>
          </div>
          <p class="article-title">{{article.title}}</p>
          <ul class="article-message">
            <li>{{article.account}}</li>
            <li>{{article.createTime}}</li>
            <li class="reading-quantity">
              <svg-icon iconName="icon-search" class="sous-icon" color="#000"></svg-icon>
              <span>{{article.hits}}</span>
            </li>

          </ul>
          <div class="article-content">
            <Editor
       
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        readOnly: true
      />
          </div>


        </div>
        <div class="comment-title article-shadow">
          <svg-icon iconName="icon-search" class="sous-icon" color="#000"></svg-icon>
          <p>评论<span>0</span> </p>
        </div>

    

        <Comment @update-comment="getComment"></Comment>


       <CommentList :commentList="commentList"></CommentList>
     


      </div>

      <div class="article-right">
        <div class="blog-user sidebar-shadow">
          <img class="blog-bg" src="@/assets/images/1.jpg" alt="">
          <img class="user-pic" src="@/assets/images/3.jpg" alt="">
          <p class="user-name">qzy</p>
          <p class="user-lable">心中无女人，代码自然神</p>
          <ul class="user-pl">
            <li>
              <p>18</p>
              <p>文章数</p>
            </li>
            <li>
              <p>11</p>
              <p>标签数</p>
            </li>
            <li>
              <p>11</p>
              <p>评论量</p>
            </li>

          </ul>
          <ul class="user-bottom">
            <li>
              <p>什么没事没事没事没事什么什么</p>
              <svg-icon iconName="icon-shouye1" class="sous-icon" color="#000"></svg-icon>
            </li>
            <li>
              <p>什么没事没事没事没事什么什么</p>
              <svg-icon iconName="icon-shouye1" class="sous-icon" color="#000"></svg-icon>
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
          <STitle :title="'相关推荐'" :icon="'icon-shouye1'"></STitle>
          <ul class="correlation-list">
            <li>
              <p>相关推荐标题</p>
              <p><span>0</span>阅读<span>·</span><span>0</span>点赞</p>
            </li>
          </ul>
        </div>

        <div class="catalogue-content" :class="{'cata-top':cataTop}">
          <Catalogue :container="'.article-content'"></Catalogue>

        </div>

     
      </div>
    </div>
  </div>
</template>



<style scoped lang="scss">
.cata-top{
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
        color: var(--routine);
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

  p {
    margin-left: 4px;
  }

  span {
    margin-left: 10px;
  }
}

.article-content {
  margin-top: 20px;
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
    color: var(--juejin-font-3);
  }

  .reading-quantity {
    display: flex;
    align-items: center;

    span {
      margin-left: 4px;
    }

  }
}

.article-title {
  color: var(--juejin-font-1);
  font-size: 32px;
  font-weight: 700;
}

.article-nav {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--classB);

  ul {
    color: var(--routine);
    font-size: 18px;

    display: flex;

    li:nth-child(1) {
      display: flex;
      align-items: center;

      span {
        margin-left: 4px;
      }
    }

    .bias {
      margin: 0 6px;
    }
  }
}
.correlation{
  margin-top: 20px;
}
.correlation-list {
  padding: 10px;

  li {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    cursor: pointer;

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

      span:nth-child(2) {
        margin: 0 4px;
      }
    }
  }
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
  background: var(--background);
  border-radius: var(--radius-wrap);
  padding: 15px;
  box-shadow: var(--box-shadow);
}

.article {
  margin-top: 20px;
  display: flex;
  justify-content: center;

  .article-left {
    width: 860px;
    margin-right: 20px;
  }

  .article-right {
    width: 260px;
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

      p:nth-child(2) {
        color: var(--routine);
        margin-top: 4px;
        font-size: 14px;

      }
    }
  }

  .user-bottom {
    margin-top: 20px;
    margin-bottom: 30px;

    li {
      margin-top: 6px;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--routine);
        max-width: 85%;
      }
    }

  }

  .user-lable {
    margin-top: 20px;
    font-size: 14px;
  }
}

.sidebar-shadow {
  background-color: #fff;
  border-radius: var(--radius-wrap);
  box-shadow: var(--box-shadow);
  width: 100%;
}</style>