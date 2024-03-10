<script setup lang="ts">
import STitle from '@/components/title/sidebarTitle.vue'

import { useRouter, useRoute } from "vue-router";
import { uidArticle, uidLabel, commentCount } from '@/utils/article'
import { userInfo } from "@/utils/user"
import axios from 'axios';
import Tool from '@/assets/tool/index'
import { ref, reactive, onBeforeMount } from 'vue';
import { useGlobalStore } from "@/stores/index"
import { router } from '@/routers';
import {onePoetry} from '@/utils/poerty.ts'


//每日一句
const poetry:any =ref({})

function poertyCut(){
  onePoetry().then((res:any)=>{
  poetry.value=res
})
}

poertyCut()


const store = useGlobalStore()

const uid: any = ref(7)

const user: any = ref({})

if (store.user.id) {

  user.value = store.user

  uid.value = store.user.id
} else {
  userInfo(uid.value).then((res: any) => {



    res.portrait = Tool.baseURL + res.portrait
    user.value = res



  })
}




async function getCreate() {

}





let bgList = [
  '#bc99c4',
  '#5961F9',
  '#ff9a9e',
  '#4C83FF',
  '#32CCBC',
  '#00EAFF',
  '#9F44D3',
  '#0396FF',
  '#F067B4',
  '#FA742B'
]

let lableList: any = reactive([

])
// lableList = lableList.map(item => {

//   let index = Math.floor(Math.random() * bgList.length)
//   let newColor = bgList[index];
//   return {
//     color: newColor,
//     name: item
//   }
// })

console.log(lableList);

let userCount = reactive({
  labelCount: 0,
  articleCount: 0,
  commentCount: 0
})

let articleList = reactive([])
let commentList = reactive([])

uidArticle(1, 2, uid.value).then((res: any) => {
  console.log(res, "www");

  userCount.articleCount = res.total
  articleList.push(...res.records)

})
uidLabel(1, 1, uid.value).then((res: any) => {

  userCount.labelCount = res.length
  console.log("标签", res);
  res = res.map((item: any) => {
    let index = Math.floor(Math.random() * bgList.length)
    let newColor = bgList[index];
    return {
      ...item,
      color: newColor
    }


  })
  lableList.push(...res)

})
commentCount(1, 3, uid.value).then((res: any) => {
  userCount.commentCount = res.total


  res.records = res.records.map((item: any) => {

    item.info = JSON.parse(item.info)
    item.imgList = item.imgList.split(",");
    item.createTime = Tool.DateFormatPipe(item.createTime, "yyyy年MM月dd日HH:mm:ss")

    item.content = imgReplace(item.content)


    // item.replyList = item.replyList.map((item2: any) => {
    //   item2.info = JSON.parse(item2.info)
    //   item2.imgList = item2.imgList.split(",");
    //   item2.createTime = Tool.DateFormatPipe(item2.createTime, "yyyy年MM月dd日HH:mm:ss")
    //   item2.content = imgReplace(item2.content)
    //   if (item2.imgList != "") {
    //     item2.imgList = item2.imgList.map((item3: any) => {
    //       return Tool.baseURL + "/api" + item3
    //     })

    //   } else {
    //     item2.imgList = ""
    //   }

    //   return {
    //     ...item2
    //   }

    // })

    // if (item.imgList != "") {
    //   item.imgList = item.imgList.map((item2: any) => {
    //     return Tool.baseURL + "/api" + item2
    //   })

    // } else {
    //   item.imgList = ""
    // }




    return {
      ...item,
    }

  })







  commentList.push(...res.records)
  console.log(commentList);



})

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
//图片替换字符
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

let newDate = new Date()
let year = Tool.DateFormatPipe(newDate, "YY")
let month = Tool.DateFormatPipe(newDate, "MM")

let day = Tool.DateFormatPipe(newDate, "DD")
let hour = Tool.DateFormatPipe(newDate, "HH")

//当月天数
let newDay = new Date(year, month, 0).getDate() // 29


function leftDays() {
  // 今天的标准时间
  let today = new Date();
  // 本年最后标准时间
  let endYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59);
  // 一天的毫秒数
  let msPerDay = 24 * 60 * 60 * 1000;
  // 计算剩余毫秒除以一天的毫秒数，就是天数
  return Math.round((endYear.getTime() - today.getTime()) / msPerDay);
}


//当天剩下多少小时
let newHour = 24 - hour

//当月剩下多少天
let remainDay = newDay - day

//今年剩下多少天
let remainYearday = leftDays()


let nowDayOfWeek = newDate.getDay(); //今天本周的第几天 

console.log(year, month, day, hour, leftDays(), newDay, nowDayOfWeek);


function toArticle(aid: any) {
  router.push(`/article/${aid}`)
}

</script>





<template>
  <div class="sidebar">
    <div class="blog-user sidebar-shadow">
      <img class="blog-bg" src="@/assets/images/1.jpg" alt="">
      <img class="user-pic" src="@/assets/images/3.jpg" alt="">
      <p class="user-name">{{ user.nickname }}</p>
      <p class="user-lable">{{ user.motto }}</p>
      <ul class="user-pl">
        <li>
          <p>{{ userCount.articleCount }}</p>
          <p>文章数</p>
        </li>
        <li>
          <p>{{ userCount.labelCount }}</p>
          <p>标签数</p>
        </li>
        <li>
          <p>{{ userCount.commentCount }}</p>
          <p>评论量</p>
        </li>

      </ul>
      <ul class="user-bottom">
        <li v-for="(item, index) in articleList" :key="index" @click="toArticle(item.aid)">
          <p>{{ item.title }}</p>
          <svg-icon iconName="icon-huixingzhen" class="sous-icon" color="#000"></svg-icon>
        </li>
        <!-- <li>
          <p>什么没事没事没事没事什么什么</p>
          <svg-icon iconName="icon-shouye1" class="sous-icon" color="#000"></svg-icon>
        </li> -->
      </ul>
    </div>

    <div class="sidebar-shadow publicity">
      <STitle :title="'站点信息'" :icon="'icon-laba'"></STitle>

      <div class="pt-content">
        <p>联系QQ:<span>1791331360</span></p>
        <p>站长信息------------------</p>
        <p>站长信息------------------</p>
      </div>
    </div>

    <div class="life-down sidebar-shadow">
      <STitle :title="'人生倒计时'" :icon="'icon-shalou-01'"></STitle>
      <ul class="life-contnet">
        <li>
          <p>今日还有<span>{{ newHour }}</span>小时</p>
          <el-progress :percentage="Math.floor((newHour / 24) * 100)" :stroke-width="10" striped striped-flow />
        </li>
        <li>
          <p>这周还有<span>{{ 7 - nowDayOfWeek }}</span>天</p>
          <el-progress :percentage="Math.floor(((7 - nowDayOfWeek) / 7) * 100)" :stroke-width="10" striped
            :color="'#f7ba2a'" />
        </li>
        <li>
          <p>本月还有<span>{{ remainDay }}</span>天</p>
          <el-progress :percentage="Math.floor((remainDay / newDay) * 100)" :stroke-width="10" striped :color="'#ff4949'" />
        </li>
        <li>
          <p>今年还有<span>{{ remainYearday }}</span>天</p>
          <el-progress :percentage="Math.floor((remainYearday / 365) * 100)" :stroke-width="10" striped
            :color="'#67c23a'" />
        </li>

      </ul>
    </div>

    <div class="comment sidebar-shadow">
      <STitle :title="'最新评论'" :icon="'icon-shequpinglun'"></STitle>
      <ul class="comment-list" v-if="commentList.length != 0">
        <li v-for="(item, index) in commentList " :key="index">
          <div class="com-top">
            <img :src="item.avatar || Tool.baseURL + '/api' + item.portrait" alt="">
            <div class="com-name">
              <p class="com-name-1">{{ item.nickname }}</p>
              <p class="com-time">{{ item.createTime }}</p>
            </div>
          </div>
          <div class="com-bottom">
            <p v-html="item.content"></p>
          </div>

        </li>
      </ul>
      <ul class="comment-null" v-else>
        暂无评论
      </ul>
    </div>

    <div class="my-lable sidebar-shadow">
      <STitle :title="'标签云'" :icon="'icon-biaoqian_1'"></STitle>
      <ul class="lable-list" v-if="lableList.length != 0">
        <li class="lable-item" v-for="(item, index) in lableList" :key="index">
          <p :style="{ background: item.color }">{{ item.name }}</p>
        </li>
      </ul>
      <ul class="comment-null" v-else>
        暂无标签
      </ul>


    </div>

    <div class="diary">
      <STitle :title="'每日一句'" :icon="'icon-shiwentiankong'"></STitle>
      <div class="diary-content">
        <div class="diary-content-1">
          <!-- 今天在楼上窗户上看见你和他在公园里接吻，我看见哭了出来，并打电话给你，想问问你为什么？但你说怎么了，声音是那么好听。于是我说“
           -->
           <p>{{poetry.title}}</p>
             ————《{{poetry.excerpts}}》
           <p></p>
        </div>
        <div class="change" @click="poertyCut()">

          <svg-icon iconName="icon-shuaxin"></svg-icon>

        </div>
      </div>
    </div>


  </div>
</template>


<style scoped lang="scss">
.emojiImg {
  padding-bottom: 20px !important;

}

.comment-null {
  text-align: center;
  padding: 20px 0;
  color: var(--main-color);
}

.change {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 auto;
  cursor: pointer;
  border: 2px solid var(--classC);
  transition: .3s;
}

.diary {
  margin-top: 20px;
  background-color: var(--main-bg-color);
  transition: .3s;

  .diary-content {
    padding: 15px;

    .diary-content-1 {
      border-bottom-left-radius: 185px 25px;
      border-bottom-right-radius: 20px 205px;
      border-top-left-radius: 125px 25px;
      border-top-right-radius: 10px 205px;
      border-style: solid;
      border-color: var(--classC);
      padding: 15px;
      line-height: 1.8;
      background: var(--classD);
      color: var(--main-color);
      margin-bottom: 15px;
      transition: .3s;
    }
  }
}

.lable-list {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;

  .lable-item {
    padding: 5px;

    p {
      color: #fff;
      padding: 3px 6px 3px 6px;
      font-size: 13px;
      border-radius: 2px;
      transition: .3s;
      cursor: pointer;
    }

    p:hover {
      background: #000 !important;
      // opacity: 0.8 !important;
    }

  }
}

.my-lable {
  margin-top: 20px;
}

.comment {
  margin-top: 20px;
  // padding: 15px;
  background-color: #fff;
}

.comment-list {
  padding: 15px;

  li {
    margin-bottom: 15px;

    .com-top {
      display: flex;
      margin-bottom: 15px;

      img {
        width: 40px;
        height: 40px;
        margin-right: 12px;
        border-radius: 50%;
        border: 1px solid var(--classA);
        padding: 2px;
      }

      .com-name {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .com-name-1 {
        color: var(--main);
        font-weight: 500;
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
        transition: .3s;

      }

      .com-time {
        font-size: 13px;
        color: var(--minor);
      }

    }
  }

  .com-bottom {
    background: var(--classD);
    border-radius: 6px;
    padding: 5px 10px;
    position: relative;



    p {
      // width: 100px;
      color: var(--main-color);

     
      >img {
        display: inline-block;
        // line-height: 33px;

      }

      display: -webkit-box;

      // display: flex;

      // align-items: center;
      // flex-wrap: wrap;

      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;

      // white-space:normal;
      // white-space:nowrap;

      font-size: 13px;
      font-weight: 500;
      line-height: 44px;
      transition: all 0.35s;
      // max-height: 48px;
    }
  }

  .com-bottom::after {
    content: "";
    width: 10px;
    height: 10px;
    position: absolute;
    top: -10px;
    left: 20px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    // border-top: 12px solid #4e4e4e;
    border-bottom: 12px solid var(--classD);
  }

}

.life-contnet {
  padding: 15px;

  span {
    color: var(--theme-color);
    padding: 0 2px;
    font-size: 16px;
  }

  li {
    margin-bottom: 15px;

    p {
      font-size: 12px;
      color: var(--minor);
      margin-bottom: 5px;
      display: flex;
      align-items: center;
    }
  }
}

.publicity {
  margin-bottom: 20px;

  .pt-content {
    padding: 15px 20px;
    color: var(--main-color);

    p {
      margin-bottom: 5px;
      font-size: 14px;

      span {
        margin-left: 4px;
      }
    }
  }
}

/* 盒子的背景和阴影 */
.sidebar-shadow {
  background: var(--main-bg-color);
  transition: .3s;
  border-radius: var(--radius-wrap);
  box-shadow: var(--box-shadow);
  width: 100%;
}

.user-lable {
  margin-top: 20px;
  font-size: 14px;
  color: var(--main-color);
  transition: .3s;
}

.user-bottom {
  margin-top: 20px;
  margin-bottom: 30px;
  padding: 0 15px;
  width: 100%;

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
      color: var(--main-color);
      transition: .3s;
      max-width: 85%;
      cursor: pointer;
    }

    p:hover {
      color: var(--theme-color);
    }
  }

}

.sidebar {
  width: 100%;
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
      color: var(--main-color);
      transition: .3s;


      p:nth-child(2) {
        // color: var(--main-color);
        margin-top: 4px;
        font-size: 14px;

      }
    }
  }
}
</style>