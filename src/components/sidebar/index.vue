<template>
  <div class="sidebar">
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

    <div class="sidebar-shadow publicity">
      <STitle :title="'站点信息'" :icon="'icon-shouye1'"></STitle>

      <div class="pt-content">
        <p>站长信息------------------</p>
        <p>站长信息------------------</p>
        <p>站长信息------------------</p>
      </div>
    </div>

    <div class="life-down sidebar-shadow">
      <STitle :title="'人生倒计时'" :icon="'icon-shouye1'"></STitle>
      <ul class="life-contnet">
        <li>
          <p>今日已经过去--</p>
          <el-progress :percentage="50" :stroke-width="10" striped striped-flow />
        </li>
        <li>
          <p>这周已过去--</p>
          <el-progress :percentage="50" :stroke-width="10" striped />
        </li>
        <li>
          <p>本月已过去--</p>
          <el-progress :percentage="50" :stroke-width="10" striped />
        </li>
        <li>
          <p>今年已过去--</p>
          <el-progress :percentage="50" :stroke-width="10" striped />
        </li>

      </ul>
    </div>

    <div class="comment sidebar-shadow">
      <STitle :title="'最新评论'" :icon="'icon-shouye1'"></STitle>
      <ul class="comment-list">
        <li>
          <div class="com-top">
            <img src="@/assets/images/2.jpg" alt="">
            <div class="com-name">
              <p class="com-name-1">你叫什么名字</p>
              <p class="com-time">1天前</p>
            </div>
          </div>
          <div class="com-bottom">
            <p>来了来了</p>
          </div>
        </li>
      </ul>
    </div>

    <div class="my-lable sidebar-shadow">
      <STitle :title="'标签云'" :icon="'icon-shouye1'"></STitle>
      <ul class="lable-list">
        <li class="lable-item" v-for="(item, index) in lableList" :key="index">
          <p :style="{background:item.color}">{{ item.name }}</p>
        </li>
      </ul>



    </div>

    <div class="diary">
      <STitle :title="'舔狗日记'" :icon="'icon-shouye1'"></STitle>
      <div class="diary-content">
          <div class="diary-content-1">
            今天在楼上窗户上看见你和他在公园里接吻，我看见哭了出来，并打电话给你，想问问你为什么？但你说怎么了，声音是那么好听。于是我说“
          </div>
          <div class="change">
            
              <svg-icon iconName="icon-shouye1" color="#000"></svg-icon>
           
          </div>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import STitle from '@/components/title/sidebarTitle.vue'
import { ref,reactive } from 'vue';
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

let lableList:any =reactive([
  'html',
  'css',
  'javaScript',
  '前端',
  '后端',
  'java',
  '前端人生',
  'api'
])
lableList=lableList.map(item=>{
    
  let index=Math.floor(Math.random()*bgList.length)
  let newColor=bgList[index];
    return{
        color:newColor,
        name:item
    }
})

console.log(lableList);

</script>

<style scoped lang="scss">
.change{
  display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0 auto;
    cursor: pointer;
    border: 2px solid var(--classC);
}
.diary{
  margin-top: 20px;
  background-color: #fff;
  .diary-content{
    padding: 15px;
    .diary-content-1{
      border-bottom-left-radius: 185px 25px;
    border-bottom-right-radius: 20px 205px;
    border-top-left-radius: 125px 25px;
    border-top-right-radius: 10px 205px;
    border-style: solid;
    border-color: var(--classC);
    padding: 15px;
    line-height: 1.8;
    background: var(--classD);
    color: var(--routine);
    margin-bottom: 15px;
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
    p:hover{
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

    p {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
      color: var(--minor);
      font-size: 13px;
      font-weight: 500;
      line-height: 24px;
      transition: all 0.35s;
      max-height: 48px;
    }
  }

}

.life-contnet {
  padding: 15px;

  li {
    margin-bottom: 15px;

    p {
      font-size: 12px;
      color: var(--minor);
      margin-bottom: 5px;
    }
  }
}

.publicity {
  margin-bottom: 20px;

  .pt-content {
    padding: 15px 20px;
    color: var(--routine);

    p {
      margin-bottom: 5px;
      font-size: 14px;
    }
  }
}

/* 盒子的背景和阴影 */
.sidebar-shadow {
  background-color: #fff;
  border-radius: var(--radius-wrap);
  box-shadow: var(--box-shadow);
  width: 100%;
}

.user-lable {
  margin-top: 20px;
  font-size: 14px;
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

      p:nth-child(2) {
        color: var(--routine);
        margin-top: 4px;
        font-size: 14px;

      }
    }
  }
}

</style>