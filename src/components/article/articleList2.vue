<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { reactive, ref, render } from 'vue'
import { typeArticle } from '@/utils/article'
import Tool from '@/assets/tool/index'

const props = defineProps({
  type: {
    type: String,
    default: 'null'
  },


})

let atype = useRoute().params.type

console.log(atype);


const articleList = reactive([] as any[])
const pages = ref(1)
const size = ref(8)
const total = ref()
updateArticle()
//分页更新文章
function updateArticle() {
  if(atype=="全部") atype=""
  typeArticle(pages.value, size.value, atype).then((res: any) => {
    console.log(res.records);
    total.value = res.total / size.value
    res.records = res.records.map((item: any) => {
      item.typeList = JSON.parse(item.typeList)

      item.typeList = item.typeList.map((item2: any) => {

        let random = Math.random() * Tool.rgbaList.length
        return {
          name: item2,
          color: Tool.rgbaList[Math.floor(random)].color,
          bg: Tool.rgbaList[Math.floor(random)].bg
        }
      })

      return {
        ...item,
        portrait: Tool.baseImg + item.portrait,
        cover: Tool.baseImg + item.cover
      }
    })
    // articleList.push(0)

    articleList.splice(0)
    articleList.push(...res.records)
    console.log(res.records, 11, articleList);

  })
}

function pchange(e: any) {
  pages.value = e

  updateArticle()
  console.log(e, total.value, pages.value);

}

const router = useRouter();

function toArticle(aid:any){
  router.push("/article/"+aid)
}

</script>
<template>
  <div class="article-list">

    <ul class="article-l-content">
      <transition-group name="item-in" >
        <li class="article-item" v-for="(item, index) in articleList" :key="index" @click="toArticle(item.aid)">
          <div class="article-top">
            <img :src="item.cover" alt="">
          </div>
          <p class="article-title">{{ item.title }}</p>
          <ul class="type-list">
            <li v-for="(item2, index2) in item.typeList" :key="index2" :style="{ background: item2.bg }">
              <svg-icon iconName="icon-bianjiwenzhang_huaban" :color="item2.color"></svg-icon>
              <span :style="{ color: item2.color }">{{ item2.name }}</span>
            </li>
          </ul>
          <div class="article-bottom">
            <div class="a-b-l">
              <img src="@/assets/images/2.jpg" alt="">
              <div>
                <span>{{ item.nickname }}</span>
                <span>1天前</span>
              </div>

            </div>
            <div class="a-b-r">
              <div>
                <svg-icon iconName="icon-liuyan" color="#999"></svg-icon>
                <span>0</span>
              </div>
              <div>
                <svg-icon iconName="icon-yanjing" color="#999"></svg-icon>
                <span>0</span>
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

    <div class="pagecat">
      <el-pagination background layout="prev, pager, next" :total="total * 10" @current-change="pchange" />
    </div>
  </div>
</template>



<style lang="scss" scoped>
.item-in-enter-active {
  -webkit-animation: fade-in-bottom 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  animation: fade-in-bottom 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

.item-in-leave-active {
  -webkit-animation: fade-out-bottom 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: fade-out-bottom 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
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
    color: #999;

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
  }
}

.article-l-content {
  width: 100%;
  height: 752px;
  display: grid;
  grid-template-columns: 24% 24% 24% 24%;
  grid-template-rows: 366px 366px 366px 366px;
  // align-items: start;
  justify-content: space-between;
  grid-row-gap: 20px;

  .article-item {
    box-shadow: 0 0 10px var(--main-shadow);
    transition: .3s ease-in-out;
    background: var(--header-bg);
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
    background: rgba(41, 151, 247, .1);
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
  }

  .type-list {
    display: flex;
    padding: 0px 10px;

    li {
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