<template>
  <div>

 
    <transition-group name="item-in" >
  <div class="comment-list" v-for="(item, index) in commentList[0][0]" :key="item.cid">
    <div class="list-1 article-shadow">
      <div class="list-left">
        <!-- <img src="@/assets/images/qqtx.png" alt=""> -->
        <img :src="item.avatar" alt="">

      </div>
      <div class="list-right">
        <div class="item-name">
          <div class="item-name-left">
            <p class="item-name-1">{{ item.nickname }}</p>
            <p class="item-time"><i>{{ item.createTime }}</i></p>
          </div>
          <div class="item-name-right">
            <div @click="commentCut(index)">
              <svg-icon iconName="icon-search" class="sous-icon" color="#000" ></svg-icon>
            </div>
          </div>
        </div>
        <div class="item-content" v-html="item.content">
        </div>
        <ul class="item-img" v-if="item.imgList != ''">
          <li v-for="item2 in item.imgList">
            <img :src="item2" alt="">
          </li>

        </ul>
        <ul class="item-ip">
          <li>{{ item.info.province }}</li>
          <li>{{ item.info.system }}</li>
          <li>{{ item.info.browser }}</li>
        </ul>
       
        <Transition mode="in-out" name="com">
        <Comment v-if="comentShow==index" :button="true" @setShow="commentCut(-1)" :cid="item.cid"></Comment>
     </Transition>
      </div>
    </div>
  </div>
  </transition-group>
</div>
</template>

<script setup lang="ts">
import { getArticleList, getListPage, getArticleId, aidComment } from '@/utils/article'
import  Comment from "@/components/comment/index.vue"
import Tool from '@/assets/tool/index'
import { useRouter, useRoute } from "vue-router";

import {ref,reactive, onMounted,watch} from 'vue';
const props = defineProps({
  commentList: {
    type: Array,
    default: []
  },


})



let comentShow=ref(-1)

let commentCut=function(index:any){
  comentShow.value=index

}


let aId: any = useRoute().params.id
let commentList = reactive([])
commentList.push(props.commentList)


// watch(props.commentList,(newVal:any,oldVal:any)=>{
//     console.log("new",newVal);
//     console.log("old",oldVal);

    
// })




onMounted(() => {
  console.log(props.commentList, "lll", commentList);

})


</script>

<style scoped lang="scss">

.article-shadow {
  background: var(--background);
  border-radius: var(--radius-wrap);
  padding: 15px;
  box-shadow: var(--box-shadow);
}

.comment-list {
  margin-top: 20px;

  .item-img {
    display: flex;
    margin-top: 10px;

    li {
      margin-right: 20px;

      img {
        cursor: pointer;
        width: 180px;
        height: 180px;
        border-radius: 4px;
        box-shadow: 0 0 4px rgba(60, 60, 67, 0.8);
      }
    }
  }

  .item-ip {
    margin-top: 20px;
    display: flex;

    li {

      padding: 6px;
      background: #f7f7f9;
      border: 1px solid #e3e8f7;
      border-radius: 8px;
      color: rgba(60, 60, 67, 0.8);
      display: inline;
      font-size: 10px;
      margin-right: 10px;
      cursor: pointer;
    }
  }

  .list-1 {
    display: flex;
    letter-spacing: .05rem;

    .list-left {

      img {
        border-radius: 15%;
        width: 45px;
        height: 45px;
      }
    }

    .list-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 15px;

      .item-name {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .item-name-left {
          flex: 7;
          display: flex;
        }

        .item-name-right {
          flex: 3;
          display: flex;
          justify-content: end;

          >div {
            display: flex;
            align-items: center;
            justify-content: center;
            width: fit-content;
            padding: 6px;
            background: #f7f7f9;
            border: 1px solid #e3e8f7;
            border-radius: 8px;
            color: rgba(60, 60, 67, 0.8);
            // display: inline;
            font-size: 10px;
            margin-right: 10px;
            cursor: pointer;
            transition: .3s;
            .svg-icon {
              font-size: 20px;
            }
          }
           >div:hover{
            background: var(--theme-color);
           }

        }

        .item-name-1 {

          color: var(--main);
          max-width: 100px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .svg-icon {
          margin-left: 4px;
        }
      }

      .item-content {
          display: flex;
          align-items: center;
        background: var(--Xc-mment);
        width: fit-content; //宽度自适应
        border-radius: 4px;
        color: var(--main);
        padding: 10px;
        margin: 20px 0;
      }

      .item-time {
        font-size: 14px;
        color: var(--minor);
        margin-left: 4px;
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


.com-enter-active {
  -webkit-animation: scale-in-ver-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: scale-in-ver-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.com-leave-active {
  -webkit-animation: scale-out-ver-bottom 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
	        animation: scale-out-ver-bottom 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}




//下滑入
 @-webkit-keyframes scale-in-ver-bottom {
  0% {
    -webkit-transform: scaleY(0);
            transform: scaleY(0);
    -webkit-transform-origin: 0% 100%;
            transform-origin: 0% 100%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    -webkit-transform-origin: 0% 100%;
            transform-origin: 0% 100%;
    opacity: 1;
  }
}
@keyframes scale-in-ver-bottom {
  0% {
    -webkit-transform: scaleY(0);
            transform: scaleY(0);
    -webkit-transform-origin: 0% 100%;
            transform-origin: 0% 100%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    -webkit-transform-origin: 0% 100%;
            transform-origin: 0% 100%;
    opacity: 1;
  }



  
}

// 下滑出
 @-webkit-keyframes scale-out-ver-bottom {
  0% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    -webkit-transform-origin: 0% 100%;
            transform-origin: 0% 100%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleY(0);
            transform: scaleY(0);
    -webkit-transform-origin: 0% 100%;
            transform-origin: 0% 100%;
    opacity: 1;
  }
}

@keyframes scale-out-ver-bottom {
  0% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    -webkit-transform-origin: 0% 100%;
            transform-origin: 0% 100%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleY(0);
            transform: scaleY(0);
    -webkit-transform-origin: 0% 100%;
            transform-origin: 0% 100%;
    opacity: 1;
  }
}

</style>