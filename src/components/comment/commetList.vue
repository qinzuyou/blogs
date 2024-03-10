<template>
  <div>


    <transition-group name="item-in">
      <div class="comment-list" v-for="(item, index) in commentList[0][0]" :key="item.cid">
        <div class="list-1 article-shadow">

          <div class="list-1-item">
            <div class="list-left" @mouseenter="replyShow = item.cid" @mouseleave="replyShow = -1">
              <!-- <img src="@/assets/images/qqtx.png" alt=""> -->
              <img v-if="item.uid" :src="baseURL + '/api' + item.portrait" alt="">

              <img v-else :src="item.avatar" alt="">
              <div class="identity" v-if="item.uid && item.uid != props.uid">普通用户</div>
              <div class="identity" v-else-if="item.uid == props.uid">博主</div>

              <div class="identity" v-else>游客</div>



              <Transition name="item-in">
                <div class="l-l-reply" v-show="replyShow == item.cid"
                  @click="commentCut(index, item.cid, item.nickname)">
                  @
                </div>
              </Transition>
            </div>
            <div class="list-right">
              <div class="item-name">
                <div class="item-name-left">
                  <p class="item-name-1" :class="{ 'item-name-1-a': item.uid }" v-if="item.uid"
                    @click="toPersonal(item.uid)">{{ item.nickname }}</p>
                  <p class="item-name-1" @click="toWebsite(item.website)"
                    :class="{ 'item-name-1-a': item.website != null && item.uid == null }"
                    v-else-if="item.website != null && item.uid == null">
                    {{ item.nickname }}</p>
                  <p class="item-name-1" v-else>{{ item.nickname }}</p>

                  <p class="item-time"><i>{{ item.createTime }}</i></p>
                </div>
                <div class="item-name-right">
                  <div @click="commentCut(index, item.cid, item.nickname)">
                    <svg-icon iconName="icon-liuyan" class="sous-icon" color="#000"></svg-icon> <span
                      v-if="item.replyList.length != 0">{{ item.replyList.length }}</span> 
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

              <transition-group name="item-in">
                <div class="list-2-item" v-for="(itemList, index2) in item.replyList" :key="itemList.cid">


                  <div class="list-2-right">


                    <div class="list-left" @mouseenter="replyShow = itemList.cid" @mouseleave="replyShow = -1">
                      <!-- <img src="@/assets/images/qqtx.png" alt=""> -->
                      <!-- <img :src="itemList.avatar" alt=""> -->
                      <img v-if="itemList.uid" :src="baseURL + '/api' + itemList.portrait" alt="">
                      <img v-else :src="itemList.avatar" alt="">

                      <div class="identity" v-if="itemList.uid && itemList.uid != props.uid">普通用户</div>
                      <div class="identity" v-else-if="itemList.uid == props.uid">博主</div>

                      <div class="identity" v-else>游客</div>

                      <Transition name="item-in">
                        <div class="l-l-reply" v-show="replyShow == itemList.cid"
                          @click="commentCut2(index, item.cid, itemList.nickname, itemList.cid)">
                          @
                        </div>
                      </Transition>
                    </div>


                    <div class="list-right">
                      <div class="item-name">
                        <div class="item-name-left">
                          <p class="item-name-1" :class="{ 'item-name-1-a': itemList.uid }" v-if="itemList.uid != null"
                            @click="toPersonal(itemList.uid)">{{ itemList.nickname }}</p>
                          <p class="item-name-1" @click="toWebsite(itemList.website)"
                            :class="{ 'item-name-1-a': itemList.website != null && itemList.uid == null }"
                            v-else-if="itemList.website != null && itemList.uid == null">{{ itemList.nickname }}</p>
                          <p class="item-name-1" v-else>{{ itemList.nickname }}</p>

                          <p class="item-time"><i>{{ itemList.createTime }}</i></p>
                        </div>

                      </div>
                      <p class="item-reply"><span>回复</span><span>@{{ itemList.replyName }}</span></p>
                      <div class="item-content" v-html="itemList.content">
                      </div>
                      <ul class="item-img" v-if="itemList.imgList != ''">
                        <li v-for="item2 in itemList.imgList">
                          <img :src="item2" alt="">
                        </li>
                      </ul>
                      <ul class="item-ip">
                        <li>{{ itemList.info.province }}</li>
                        <li>{{ itemList.info.system }}</li>
                        <li>{{ itemList.info.browser }}</li>
                      </ul>
                    </div>
                  </div>
                  <div class="list-2-left">
                    <div class="item-name-right">
                      <div @click="commentCut2(index, item.cid, itemList.nickname, itemList.cid)">
                        <svg-icon iconName="icon-liuyan" class="sous-icon" color="#000"></svg-icon> <span
                      v-if="item.replyList.length != 0"> {{ item.replyList.length }}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </transition-group>

            </div>
          </div>





          <Transition mode="in-out" name="item-in">
            <Comment v-if="comentShow == index" :button="true" @setShow="commentCut(-1, '', '')"
              @update-comment="updateComment()" :nickname="commentName" :uid="props.uid" :replyId="commentReplyId"
              :relevanceId="commentRelevanceId"></Comment>
          </Transition>

        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { getArticleList, getListPage, getArticleId, aidComment } from '@/utils/article'
import Comment from "@/components/comment/index.vue"
import Tool from '@/assets/tool/index'
import { useRouter, useRoute } from "vue-router";

let baseURL = Tool.baseURL
import { ref, reactive, onMounted, watch } from 'vue';
import { router } from '@/routers';
const props = defineProps({
  commentList: {
    type: Array,
    default: []
  },
  uid: {
    type: Number,
    default: ""
  }


})


//更新评论
const emit = defineEmits(['updateComment', 'updateCount']);

// console.log(emit('updateComment'), 'emit');


function updateComment() {
  // console.log("6666666666666");
  emit('updateComment')
  emit('updateCount')

}

let comentShow = ref(-1)

let replyShow = ref(-1)

let commentCid: any = ref()

//回复
let commentRelevanceId: any = ref()

//回复下回复
let commentReplyId: any = ref()

let commentName: any = ref()

let commentCut = function (index: any, cid: any, name: any) {
  comentShow.value = index

  commentRelevanceId.value = cid

  commentReplyId.value = cid
  commentName.value = name

}
let commentCut2 = function (index: any, cid: any, name: any, cid2: any) {
  comentShow.value = index

  commentRelevanceId.value = cid

  commentReplyId.value = cid2
  commentName.value = name

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


function toWebsite(site: any) {
  // window.location.href=site
  window.open('https://' + site)
}

function toPersonal(uid: any) {
  router.push(`/personal/${uid}`)
}

</script>

<style scoped lang="scss">
.item-name-1-a {
  cursor: pointer;
}

.identity {
  white-space: nowrap;
  color: #fff;
  border-radius: 4px;
  text-align: center;
  font-size: 10px;
  background: var(--theme-color);
  width: fit-content;
  margin-top: 4px;
  padding: 2px 4px;
}

.item-reply {
  color: #999;
  font-size: 14px;
}

.article-shadow {
  background: var(--main-bg-color);
  border-radius: var(--radius-wrap);
  transition: .3s;
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
      transition: .3s;
      padding: 6px;
      // background: #f7f7f9;
      border: 1px solid #e3e8f7;
      border-radius: 8px;
      background: var(--classD);
      color: var(--main-color);
      display: inline;
      font-size: 10px;
      margin-right: 10px;
      cursor: pointer;
    }
  }

  .list-1 {

    letter-spacing: .05rem;

    .list-1-item {
      display: flex;

      .list-left {
        position: relative;
        // height: 45px;
        display: flex;
        flex-direction: column;
        align-items: center;
        // overflow: hidden;

        .l-l-reply {
          cursor: pointer;
          position: absolute;
          top: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.3);
          width: 45px;
          height: 45px;
          border-radius: 15%;
          line-height: 45px;
          text-align: center;
          color: #fff;
          font-size: 24px;

        }

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

            display: flex;
            align-items: center;
          }

          .item-name-right {

            display: flex;
            justify-content: end;



            >div {
              display: flex;
              align-items: center;
              justify-content: center;

              // width: 33px;
              // height: 33px;
              background: #f7f7f9;
              border: 1px solid #e3e8f7;
              border-radius: 8px;
              color: rgba(60, 60, 67, 0.8);
              padding: 4px;
              // font-size: 10px;

              cursor: pointer;
              transition: .3s;

              .svg-icon {
                font-size: 20px;
              margin-right: 2px;

              }
              span{
              font-size: 14px;
            }
            }

            >div:hover {
              background: var(--theme-color);
            }

          }

          .item-name-1 {

            color: var(--main-color);
            max-width: 100px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            transition: .3s;
          }

          .svg-icon {
            margin-left: 4px;
          }
        }

        .item-content {

          p>img{display:block;margin:0 auto;}
          display: flex;
          // align-items: center;
          background: var(--classD);
          color: var(--main-color) !important;
          transition: .3s;
          width: fit-content; //宽度自适应
          border-radius: 4px;

          padding: 10px;
          margin: 15px 0;

          display: -webkit-box;

          // display: flex;

          align-items: center;
          // flex-wrap: wrap;

          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          color: var(--minor);

          // font-size: 13px;
          // font-weight: 500;
          line-height: 33px;
          transition: all 0.35s;
        }

        .item-time {
          font-size: 14px;
          color: var(--minor);
          margin-left: 4px;
          transition: .3s;
        }

      }
    }

    .list-2-item {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      padding: 20px 0;
      border-top: 1px solid #999;

      .list-2-left {
        .item-name-right {
          display: flex;
          justify-content: end;

          >div {
            // padding: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: fit-content;
            padding: 6px;
            // width: 33px;
            // height: 33px;
            background: #f7f7f9;
            border: 1px solid #e3e8f7;
            border-radius: 8px;
            color: rgba(60, 60, 67, 0.8);
            // display: inline;
            font-size: 10px;
            cursor: pointer;
            transition: .3s;

            .svg-icon {
              font-size: 20px;
              margin-right: 2px;

            }
            span{
              font-size: 14px;
            }
          }

          >div:hover {
            background: var(--theme-color);
          }

        }
      }

      .list-2-right {
        display: flex;
      }

      .list-left {
        position: relative;
        // overflow: hidden;
        // height: 45px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .l-l-reply {
          cursor: pointer;
          position: absolute;
          top: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.3);
          width: 45px;
          height: 45px;
          border-radius: 15%;
          line-height: 45px;
          text-align: center;
          color: #fff;
          font-size: 24px;

        }

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
            display: flex;
            padding: 6px 0;
            align-items: center;
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
          // display: flex;
          // align-items: center;
          background: var(--classD);
          color: var(--main-color);

          width: fit-content; //宽度自适应
          border-radius: 4px;

          padding: 10px;
          margin: 20px 0;


          display: -webkit-box;



          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          color: var(--minor);

          // font-size: 16px;
          // font-weight: 500;
          line-height: 33px;
          transition: all 0.35s;
        }

        .item-time {
          font-size: 14px;
          color: var(--minor);
          margin-left: 4px;
        }

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