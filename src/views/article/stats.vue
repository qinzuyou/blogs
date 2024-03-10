<script setup lang="ts">
import Huge from '@/components/hugescreen/index.vue'
import Sidebar from '@/components/sidebar/index.vue'
import { Stats } from "@/utils/article"

import { useGlobalStore } from "@/stores/index.ts"
import { reactive,ref } from 'vue';
import { router } from '@/routers';

let store = useGlobalStore()

let statsLits = reactive([])
let uid=ref(7)

if (store.user.uid) {
    uid.value=store.user.uid
}
Stats(store.user.uid).then((res: any) => {

res.map((item: any) => {
  item.MonthList = item.MonthList.map((item2: any) => {

    return {
      ...item2,
      cut: false
    }
  })

  item.MonthList = item.MonthList.filter((item3:any)=>{
        return  item3.articleList.length!=0
  })

  return {
    ...item
  }
})


console.log(res);
res[0].MonthList[0].cut=true

statsLits.push(...res)

})

//文章列表显现
function cutShow(index: any, index2: any) {
  console.log(statsLits[index]);

  statsLits[index].MonthList[index2].cut = !statsLits[index].MonthList[index2].cut
}

function toArticle(aid:any){
    router.push(`/article/${aid}`)
}

</script>

<template>
  <div class="stats">
    <Huge :img="'/public/images/2.jpg'" :title="'文章归档'"></Huge>

    <div class="stats-box fade-in-bottom">
      <div class="stats-left box-shadow">
        <p class="stats-title">文章归档</p>
        <div class="stats-list" v-for="(item, index) in statsLits" :key="index">
          <template v-for="(item2, index2) in item.MonthList" :key="index2">
            <div class="list-item" v-if="item2.articleList.length != 0">
              <div class="tail">
              </div>
              <div class="ball" :class="{'ball-active':item2.cut}">
              </div>
              <div class="item">
                <div class="item-title">
                  <p>{{ item.StatSYear }}年{{ item2.statSMonth }}月</p>
                 
                  <svg-icon v-if="store.theme" iconName="icon-arrow-right" :class="{ 'spin': item2.cut }" color="#4e5358"
                    @click="cutShow(index, index2)"></svg-icon>
                    <svg-icon v-else iconName="icon-arrow-right" :class="{ 'spin': item2.cut }" color="#e5eef7"
                    @click="cutShow(index, index2)"></svg-icon>
                 
                </div>
                <Transition name="item-in" mode="out-in">
             
                 
                    <ul v-show="item2.cut">
                      <li @click="toArticle(item3.aid)" v-for="(item3, index3) in item2.articleList"><span>{{ item2.statSMonth }}/{{ item3.articleDay
                      }}:</span>{{ item3.title }}</li>

                    </ul>                          
      </Transition>
              </div>
            </div>
          </template>


        </div>

      </div>
      <div class="stats-right">
        <Sidebar></Sidebar>
      </div>
    </div>

  </div>
</template>



<style lang="scss" scoped>
.ball-active{
  background: var(--theme-color) !important;
 
}
//动画
.item-in-enter-active {

  animation: li-in 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
 

}

.item-in-leave-active {
 
 
  animation: li-out 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;

}

@keyframes li-in {
  0% {
   transform: translateX(-10px);
   
    opacity: 0;
  }

  100% {
   transform: translateX(0px);
   
    opacity: 1;
  }
}
@keyframes li-out {
  0% {
   transform: translateX(0px);
 
    opacity: 1;
  }

  100% {
   transform: translateX(-10px);
    
    opacity: 0;
  }
}

.spin {
  transform: rotate(90deg);
  transition: .3s;
}

.stats-list {
  padding: 0 15px;

  .ball {
    transition: .3s;
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #ccc;
    top: 22px;
    left: -6px;
  }

  .list-item {
    position: relative;
    display: flex;
    width: 100%;

    .tail {
      width: 2px;
      background: #ccc;
        transition: .3s;
      margin-right: 25px;
    }

    .item {
      flex: 1;
      transition: .3s;
      ul {
        padding-bottom: 10px;

        li {
          color: var(--main-color);
          padding: 0 15px;
          margin-top: 10px;
          transition: .3s;
          cursor: pointer;

          span {
            margin-right: 6px;
          }
        }

        li:hover {
          color: var(--theme-color);
        }
      }

      .item-title {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: var(--classD);
        color: var(--main-color);
        padding: 10px 12px;
        border-radius: 4px;
        font-size: 16px;
        margin: 10px 0;
        transition: .3s;

        .svg-icon {
          transition: .3s;
          cursor: pointer;
        }

        span {}
      }

      .item-title::before {
        transition: .3s;
        content: "";
        position: absolute;
        left: -8px;
        top: 12px;
        border-top: 8px solid transparent;
        border-right: 8px solid var(--classD);
        border-bottom: 8px solid transparent;
      }
    }
  }
}

.stats-box {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;

  .stats-left {
    max-width: 880px;
    height: fit-content;
    padding-bottom: 15px;

    .stats-title {
      padding: 12px 15px;
      border-bottom: 1px solid var(--classC);
      margin-bottom: 10px;
      color: var(--main-color);
      transition: .3s;
    }

  }

  .stats-right {
    max-width: 260px;
    @media screen and (max-width: 1024px) {
            display: none;
    }
  }
}

.stats-content {}

.box-shadow {
  background: var(--main-bg-color);
  transition: .3s;
  border-radius: var(--radius-wrap);
  box-shadow: var(--box-shadow);
  width: 100%;
}
</style>