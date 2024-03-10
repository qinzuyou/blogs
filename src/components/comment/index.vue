
<script setup lang="ts">
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { Ref, nextTick, reactive, ref, onMounted, onBeforeMount, toRaw, inject } from 'vue';
import Tool from "@/assets/tool/index"
import { fi } from 'element-plus/es/locale/index.mjs';
import { useRouter, useRoute } from "vue-router";
import { addComment } from "@/utils/article"

import { useGlobalStore } from "@/stores/index"

// const props = defineProps({
//   uid:{
//     type:Number,
//     default:0
//   }
// })

const store = useGlobalStore()

const user: any = ref({})

const uId: any = ref("")
if (store.user.uid) {
  uId.value = store.user.uid
  user.value = store.user
}


// console.log(inject("getComment", 55555), 'comment');



const props = defineProps({
  uid: {
    type: Number,
    default: ""
  },
  type: {
    type: String,
    default: 'null'
  },
  button: {
    type: Boolean,
    default: false
  },
  relevanceId: {
    type: String,
    default: ""
  },
  replyId: {
    type: String,
    default: ""
  },
  nickname: {
    type: String,
    defaule: null
  }
})
const emit = defineEmits(['setShow', 'updateComment', 'updateCount']);

console.log(emit('updateComment'), 'emit2');

//文章id
let aId: any = useRoute().params.id


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



let memeShow = ref(false)
//切换
function memeCut(meme: any) {
  memeType.value = meme
  hintA.value = -1
  console.log(memeType.value);

}

let hintA = ref(-1)

function hintShow(index: any) {
  hintA.value = index


}

function hintHide() {
  hintA.value = -1



}

//光标处插入文本
const inputRef = ref(null);

const handleKeyDown = (event: any) => {

  if (event.key === 'Enter') {
    console.log(inputRef.value);

    // 获取光标位置
    const start = inputRef.value.selectionStart;
    const end = inputRef.value.selectionEnd;
    // 插入字符
    const value = inputRef.value.value;
    inputRef.value.value = value.slice(0, start) + '你要插入的字符' + value.slice(end);
    // 更新光标位置
    inputRef.value.selectionStart = start + 1;
    inputRef.value.selectionEnd = start + 1;
    // 阻止默认行为
    event.preventDefault();
  }
};

let inputStart = ref(0)
let inputEnd = ref(0)


function addMeme(text: any, type: any) {
  // 获取光标位置
  const start = inputRef.value.selectionStart;
  const end = inputRef.value.selectionEnd;

  // inputStart.value=inputRef.value.selectionStart
  // inputEnd.value=inputRef.value.selectionEnd
  // 插入字符
  const value = inputRef.value.value;
  inputRef.value.value = value.slice(0, start) + type + text + value.slice(end);
  // 更新光标位置

  inputRef.value.selectionStart = start + text.length + 2;
  inputRef.value.selectionEnd = end + text.length + 2;

  // inputStart.value=inputRef.value.selectionStart
  // inputEnd.value=inputRef.value.selectionEnd

  nextTick(() => {
    inputRef.value.focus()
  })

  // 阻止默认行为
  // console.log(inputRef.value.selectionStart,inputRef.value.selectionEnd);


}


//css过渡
function beforeEnter(dom: any) {
  dom.classList.add('fade-list-enter-active');
}
function enter(dom: any, done: any) {
  let delay = dom.dataset.delay;
  setTimeout(() => {
    dom.classList.remove('fade-list-enter-active');
    dom.classList.add('fade-list-enter-to');
    let transitionend = window.ontransitionend ? "transitionend" : "webkitTransitionEnd";
    dom.addEventListener(transitionend, function onEnd() {
      dom.removeEventListener(transitionend, onEnd);
      done(); //调用done() 告诉vue动画已完成，以触发 afterEnter 钩子
    })

  }, delay);
}
function afterEnter(dom: any) {
  dom.classList.remove('fade-list-enter-to');
}



function getMeme2() {
  axios({
    method: 'get',
    url: '/src/assets/emotion/OwO.json',
  }).then((res: any) => {
    console.log(res);

  }).catch((err: any) => {
    console.log(err);

  })


}
// axios({
//   method:'post',
//   url:'test.json',
//   data:{
//     id:1,
//     name:2
//   }
// }).then((res:any)=>{
//   console.log(res);

// }).catch((err:any)=>{
//   console.log(err);
// })


// 官方用例
// 1.添加请求拦截器
// axios.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     return config;
//   }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
//   });
// ​
// // 2.添加响应拦截器
// axios.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
//     return response;
//   }, function (error) {
//     // 对响应错误做点什么
//     return Promise.reject(error);
//   });

//   async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }





// async function getQQ() {
//   let res: any = await axios({
//     method: 'get',
//     url: `api/api/t-user/get/1`
//   })

//   console.log(res);

// }
// getQQ()
// let aurl='fcg-bin/cgi_get_portrait.fcg?uins=1791331360'
// axios.get('api2/'+aurl).then((res:any)=>{
//     console.log(res,'00');

// }).catch(err=>{
//   console.log(err,'4');

// })





onMounted(() => {
})
onBeforeMount(() => {
})




let userQQ: any = ref({
  avatar: '',
  email: '',
  name: '',
  qq: '',
  website:''
})

if (store.emailUser) {
  userQQ.value.avatar = store.emailUser.avatar
  userQQ.value.qq = store.emailUser.name
  userQQ.value.name = store.emailUser.qq
  userQQ.value.email = store.emailUser.email
}

let labelCut = ref(false)
let labelCut2 = ref(false)

let labelCut3 = ref(false)

function labelCuts() {

  labelCut.value = !labelCut.value

}
function labelCuts2() {

  labelCut2.value = !labelCut2.value

}
function labelCuts3() {

  labelCut3.value = !labelCut3.value

}

function getQQ() {
  labelCuts()
  var n = Number(userQQ.value.qq);
  // console.log(n, userQQ.value.qq);

  if (userQQ.value.qq == '') {
    ElMessage.success(`qq不能为空！`)

  }
  // else if (isNaN(n)) {
  //   ElMessage.success(`请输入正确qq号！`)

  // }

  // else if (userQQ.value.qq.length < 5) {
  //   ElMessage.success(`qq号不能少于5位数！`)
  // }

  else {
    // userQQ.value.qq = ""
    // userQQ.value.avatar = ""
    // userQQ.value.email = ""
    // ElMessage.error(`请输入qq数字`)
    //获取qq信息
    axios.get(`https:/api.usuuu.com/qq/${userQQ.value.qq}`).then((res: any) => {
      console.log(res, 1111);

      userQQ.value.avatar = res.data.data.avatar
      userQQ.value.email = res.data.data.email
      userQQ.value.name = userQQ.value.qq

      let qq = res.data.data.qq
      if (res.data.data.name == '') {
        userQQ.value.qq = '昵称为空！'
      } else {
        userQQ.value.qq = res.data.data.name

      }
      let data = {
        avatar: userQQ.value.avatar,
        email: userQQ.value.email,
        name: userQQ.value.qq,
        qq: qq
      }
      store.setEmail(data)
      ElMessage.success(`qq信息获取成功`)


    })

  }

}

let imgUp = ref(false)


function memeCuts(state: any) {
  if (state == 0) {
    memeShow.value = !memeShow.value
    imgUp.value = false
  } else if (state == 1) {
    imgUp.value = !imgUp.value
    memeShow.value = false
  }


}

//评论图片上传

let upImgFile = reactive([])

let upImgList = reactive([])

function upImg(e: any) {
  let file = e.target.files[0];

  console.log(file);

  // console.log(file);
  console.log(URL.createObjectURL(file));


  if (upImgList.length >= 3) {
    ElMessage.error("评论图片不能超过3张！")
    return
  } else {
    let imgName = upImgList.filter((res: any) => {
      return res.name == e.target.files[0].name
    })

    if (imgName.length == 0) {
      let img = {
        url: URL.createObjectURL(file),
        name: e.target.files[0].name
      }
      upImgList.push(img)
      upImgFile.push(file)
      // console.log(upImgList, upImgFile);
    }

  }

}


//图片上传
let coverCut = ref(-1)


function coverCuts(index: any) {
  coverCut.value = index
}

function coverCuts2() {
  coverCut.value = -1

}
function deleteImg(index: any) {
  upImgList.splice(index, 1)
  upImgFile.splice(index, 1)
}





//地址
let siteData: any = ref({
  system: Tool.getUserOsInfo(),
  browser: Tool.getBrowserType(),
  city: "",
  district: "",
  nation: "",
  province: "",
  nation_code: "",
  ip: "",
  adcode: ""
})


//发表成功后清空内容

function clear() {
  inputRef.value.value = ""

  upImgFile.splice(0)

  upImgList.splice(0)

}



//发表评论
async function Comment() {

  if (inputRef.value.value == "") {
    ElMessage.error("评论不能为空！")
    return
  } else if (userQQ.value.qq == ""&&uId.value=="") {
    ElMessage.error("qq不能为空！")
    return
  } else {
    console.log(navigator, Tool.getUserOsInfo(), Tool.getBrowserType(), inputRef.value.value);

    //通过腾讯地图获取地址
    await axios.post('/ip', {
      key: '24CBZ-PX5WQ-VLM5Z-GMC56-4QLRH-75B6D'
    }).then((res: any) => {
      console.log(res, 55);
      siteData.value.city = res.data.result.ad_info.city
      siteData.value.adcode = res.data.result.ad_info.adcode
      siteData.value.district = res.data.result.ad_info.display
      siteData.value.nation = res.data.result.ad_info.nation
      siteData.value.province = res.data.result.ad_info.province
      siteData.value.nation_code = res.data.result.ad_info.nation_code
      siteData.value.ip = res.data.result.ip
    })

    let data = new FormData()

    let imglist: any = []

    if (uId.value) {
      data.append("uId", uId.value)
      data.append("nickname", user.value.nickname)
      let qq = user.value.account.slice(0, user.value.account.length - 7)
      data.append("qq", qq)
      data.append("email", user.value.account)
      let portrait = user.value.portrait.slice(23, user.value.portrait.length)
      data.append("portrait", portrait)
      data.append("website",user.value.website)
      

    } else {
      data.append("nickname", userQQ.value.qq)
      data.append("qq", userQQ.value.name)
      data.append("email", userQQ.value.email)
      data.append("avatar", userQQ.value.avatar)
      data.append("website",userQQ.value.website)

    }

    data.append("aId", aId)
    data.append("content", inputRef.value.value)




    data.append("relevanceId", props.relevanceId)
    data.append("replyId", props.replyId)


    let info = JSON.stringify(siteData.value)
    data.append("info", info)



    for (let item of upImgFile) {
      imglist.push(item.name)
      data.append("files", item)
    }
    imglist = JSON.stringify(imglist)

    data.append("imgList", imglist)


    await addComment(data).then((res: any) => {
      console.log(res);

      ElMessage.success("发表成功！")
      clear()
      emit('updateComment')
      emit('updateCount')

    })

  }




}


</script>
<template>
  <div class="comment-user article-shadow" :class="{ 'dark': props.button }">
    <div class="reply" v-if="props.nickname">@{{ props.nickname }}{{ props.relevanceId }}</div>

    <div class="com-user" v-if="uId">

      <div class="com-user-img">
        <transition mode="out-in">
          <img v-if="user.portrait == ''" src="@/assets/images/qqtx.png" alt="">
          <img v-else :src="user.portrait" alt="">
        </transition>
        <div class="identity">
          <div v-if="uId && uId != props.uid">普通用户</div>
          <div v-else-if="uId == props.uid">博主</div>
          <div v-else>游客</div>
        </div>

      </div>


      <ul>
        <li>
          <Transition name="card">
            <div class="user-hint" v-show="labelCut">
              <div>输入qq会自动获取</div>
            </div>
          </Transition>
          <div class="label-name">
            昵称
          </div>
          <div class="label-user">{{ user.nickname }}</div>
        </li>
        <li>
          <Transition name="card">
            <div class="user-hint" v-show="labelCut2">
              <div>您将收到邮件回复通知</div>
            </div>
          </Transition>
          <div class="label-name">
            邮箱
          </div>

          <div class="label-user">{{ user.account }}</div>

        </li>
        <li>
          <Transition name="card">
            <div class="user-hint" v-show="labelCut3">
              <div>通过您的昵称可以访问您的网址</div>
            </div>
          </Transition>
          <div class="label-name">
            网址
          </div>

          <div class="label-user">{{ user.wbsite }}</div>
        </li>
      </ul>
    </div>
    <div class="com-user" v-else>

      <div class="com-user-img">
        <transition mode="out-in">
          <img v-if="userQQ.avatar == ''" src="@/assets/images/qqtx.png" alt="">
          <img v-else :src="userQQ.avatar" alt="">
        </transition>
        <div class="identity">
          <div v-if="uId && uId != props.uid">普通用户</div>
          <div v-else-if="uId == props.uid">博主</div>
          <div v-else>游客</div>
        </div>

      </div>


      <ul>
        <li>
          <Transition name="card">
            <div class="user-hint" v-show="labelCut">
              <div>输入qq会自动获取</div>
            </div>
          </Transition>
          <div class="label-name">
            昵称
          </div>
          <input type="text" v-model="userQQ.qq" @blur="getQQ" @focus="labelCuts()">
        </li>
        <li>
          <Transition name="card">
            <div class="user-hint" v-show="labelCut2">
              <div>您将收到邮件回复通知</div>
            </div>
          </Transition>
          <div class="label-name">
            邮箱
          </div>
          <input type="text" v-model="userQQ.email" @blur="labelCuts2()" @focus="labelCuts2()">
        </li>
        <li>
          <Transition name="card">
            <div class="user-hint" v-show="labelCut3">
              <div>通过您的昵称可以访问您的网址</div>
            </div>
          </Transition>
          <div class="label-name">
            网址
          </div>
          <input type="text" @blur="labelCuts3()" @focus="labelCuts3()" v-model="userQQ.website">
        </li>
      </ul>
    </div>

    <div class="comment-content">
      <textarea name="" ref="inputRef" class="comment-text" placeholder="不要走呀~好想听听你说话~" id="" cols="30"
        rows="10"></textarea>
      <div class="comment-submit">
      
          <div class="svg-list" v-if="store.theme">
            <svg-icon @click="memeCuts(0)" iconName="icon-a-ziyuan123" class="sous-icon" ></svg-icon>
            <svg-icon @click="memeCuts(1)" iconName="icon-picture" class="img-icon" color="#000"></svg-icon>
          </div>
          <div class="svg-list" v-else>
            <svg-icon @click="memeCuts(0)" iconName="icon-a-ziyuan123" class="sous-icon" ></svg-icon>
            <svg-icon @click="memeCuts(1)" iconName="icon-picture" class="img-icon" color="#fff"></svg-icon>
          </div>
 
        <div class="com-submit" @click="Comment">
          <div class="submit-cancel" v-if="props.button" @click="emit('setShow')">
            取消
          </div>
          <div class="submit-comment">
            发表评论
          </div>

        </div>
      </div>
      <Transition mode="out-in" name="card">

        <div class="imgUplod" v-if="imgUp">
          <ul>
            <li v-for="(item, index) in upImgList" :key="index">
              <div class="cover-s-box" @mouseenter="coverCuts(index)" @mouseleave="coverCuts2">
                <transition>
                  <ul v-if="coverCut == index">
                    <li>
                      <svg-icon iconName="icon-search" color="#fff"></svg-icon>
                    </li>
                    <li>
                      <svg-icon @click="deleteImg(index)" iconName="icon-lajitong" color="#fff"></svg-icon>
                    </li>

                  </ul>
                </transition>
                <img :src="item.url" alt="">
              </div>
            </li>
            <li class="img-list-up">
              <label for="submit" class="upload-box">
                <div class="uploadImg">
                  <svg-icon iconName="icon-wei-1" color="#ccc"></svg-icon>
                </div>
                <input id="submit" type="file" style="display:none" accept="image/*" ref="fileInput" @change="upImg" />

              </label>
            </li>
          </ul>
        </div>
        <div class="meme" v-else-if="memeShow">


          <TransitionGroup name="fade-list" :css="false" @before-enter="beforeEnter" @enter="enter"
            @after-enter="afterEnter">

            <ul class="aru" v-show="memeType == '蛆音娘'" key="蛆音娘">
              <li class="item" v-for="(item, index) in Quyin" :key="index" @click="addMeme(item.text, '::')"
                @mouseenter="hintShow(index)" @mouseleave="hintHide">
                <div class="item-icon" v-show="hintA == index">{{ item.text }}</div>
                <img :src="'/emotion/quyin/' + item.icon + '.png'" alt="">
              </li>
            </ul>
            <ul class="aru" v-show="memeType == '贴吧泡泡'" key="贴吧泡泡">
              <li class="item" v-for="(item, index) in Tieba" :key="index" @click="addMeme(item.text, '##')"
                @mouseenter="hintShow(index)" @mouseleave="hintHide">
                <div class="item-icon" v-show="hintA == index">{{ item.text }}</div>
                <img :src="'/emotion/paopao/' + item.icon + '.png'" alt="">
              </li>
            </ul>
            <ul class="aru" v-show="memeType == 'B站'" key="B站">
              <li class="item" v-for="(item, index) in Bzhan" :key="index" @click="addMeme(item.text, '@@')"
                @mouseenter="hintShow(index)" @mouseleave="hintHide">
                <div class="item-icon" v-show="hintA == index">{{ item.text }}</div>
                <img :src="'/emotion/BZ/' + item.icon + '.png'" alt="">
              </li>
            </ul>
            <ul class="aru" v-show="memeType == '微博'" key="微博">
              <li class="item" v-for="(item, index) in Weibo" :key="index" @click="addMeme(item.text, '%%')"
                @mouseenter="hintShow(index)" @mouseleave="hintHide">
                <div class="item-icon" v-show="hintA == index">{{ item.text }}</div>
                <img :src="'/emotion/weibo/' + item.icon + '.png'" alt="">
              </li>
            </ul>
            <ul class="aru" v-show="memeType == '阿鲁'" key="阿鲁">
              <li class="item" v-for="(item, index) in Alu" :key="index" @click="addMeme(item.text, '&&')"
                @mouseenter="hintShow(index)" @mouseleave="hintHide">
                <div class="item-icon" v-show="hintA == index">{{ item.text }}</div>
                <img :src="'/emotion/aru/' + item.icon + '.png'" alt="">
              </li>
            </ul>
            <ul class="aru" v-show="memeType == '颜文字'" key="颜文字">
              <li class="item" v-for="(item, index) in Yanwen" :key="index" @click="addMeme(item.icon, '')">
                {{ item.icon }}
              </li>
            </ul>

          </TransitionGroup>
          <ul class="meme-type">
            <li v-for="(item, index) in memeList" :key="index" :class="{ 'memeActive': memeType == item }"
              @click="memeCut(item)">
              {{ item }}</li>
          </ul>
        </div>
      </Transition>

    </div>


  </div>
</template>



<style scoped lang="scss">
.label-user {

  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 14px;
  flex: 1;

  border-radius: 0px 5px 5px 0px;
  border: 1px solid rgba(144, 147, 153, 0.3137254902);
  color: var(--main-color);
  transition: 0.3s;
}

.dark {
  transition: .3s;
  box-shadow: 0 0px 10px var(--box-shadow2) !important;
}

.reply {
  margin-bottom: 10px;
  color: #999;
}

.imgUplod {
  >ul {
    display: flex;

    >li {
      margin-right: 10px;
    }
  }
}

.cover-s-box {
  overflow: hidden;
  position: relative;
  width: 160px;
  height: 160px;
  border: 1px solid #cdd0d6;
  border-radius: 4px;
  cursor: pointer;


  ul {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;

    li {
      padding: 20px;
    }
  }

  img {
    width: 100%;
    height: 100%;
  }
}

.uploadImg {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;
  border: 1px dashed #cdd0d6;
  border-radius: 4px;
  background: #fafafa;
  position: relative;
  transition: .3s;

  .up-close {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}

.uploadImg:hover {
  border: 1px dashed var(--theme-color);

}

.svg-list {
  .img-icon {
    margin-left: 10px;
  }
}

.meme-type {
  display: flex;
  padding-top: 10px;
  border-top: 1px solid var(--classC);
  transition: .3s;

  li {
    padding: 5px;
    color: var(--main-color);
    transition: .3s;
    cursor: pointer;
    text-align: center;
  }
}

.memeActive {
  background: var(--theme-color);
  color: #fff !important;
  border-radius: 2px;
}

.meme {
  margin-top: 10px;
}

.aru {
  display: flex;
  flex-wrap: wrap;
  width: 100%;




  li {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 5px;
    cursor: pointer;
    transition: .3s;
    color: var(--main-color);

    img {
      width: 33px;
      height: 33px;
    }

    .item-icon {
      position: absolute;
      top: -100%;
      padding: 10px;
      background: #000;
      color: #fff;
      white-space: nowrap;
    }
  }

  li:hover {

    background: rgba($color: rgb(0, 191, 255), $alpha: .2);
  }

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
    color: var(--main-color);
    background: transparent;
    font-size: 15px;
  }

  .comment-submit {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .svg-icon {
      cursor: pointer;
    }
  }

  .com-submit {
    display: flex;

    .submit-cancel {
      border-radius: 3px;
      height: 32px;
      line-height: 32px;
      padding: 0 15px;
      color: var(--main-color);
      transition: .3s;
    }

    .submit-cancel:hover {
      cursor: pointer;
      color: var(--theme-color);
    }

    .submit-comment {
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
  }

  .submit-comment:hover {
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

  .com-user-img {
      display: flex;
      flex-direction: column;
      align-items: center;
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

    
    border-radius: 50%;
    // overflow: hidden;

    img {
      width: 40px;
    height: 40px;
      border-radius: 50%;


    }
  }

  ul {
    flex: 1;
    display: flex;


    li {
      position: relative;
      flex: 1;
    }

    .user-hint {
      position: absolute;
      top: -50px;
      left: 30%;
      background: #4e4e4e;
      border-radius: 6px;
      color: #fff;
      font-size: 14px;
      padding: 10px;

      div {
        position: relative;
      }

      div::after {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        bottom: -20px;
        left: 45%;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 12px solid #4e4e4e;

      }
    }

    li {
      display: flex;
      white-space: nowrap;
      margin-left: 1rem;

      .label-name {
        padding: 8px 1rem;
        border-radius: 5px 0px 0px 5px;
        background-color: rgba(144, 147, 153, 0.23);
        color: var(--main-color);
        transition: .3s;
        font-size: 15px;
      }


      input {
        background: transparent;
        padding: 0 15px;
        border-radius: 0px 5px 5px 0px;
        border: 1px solid #90939950;
        color: var(--main-color);
        transition: .3s;
        display: block;
        width: 100%;
        box-sizing: border-box
      }
    }
  }
}





//   .v-enter-from,
// .v-leave-to {
//   opacity: 0;
// }
// /* 离开和进入过程中的样式 */
// .v-enter-active,
// .v-leave-active {
//   /* 添加过渡动画 */
//   transition: opacity 0.5s ease;
// }
/* 进入之后和离开之前的样式 */
// .v-enter-to,
// .v-leave-from {
//   opacity: 1;
// }

// .hello-enter-active, .hello-leave-active {
// 		transition: 0.5s linear;
// 	}
//     /*进入的起点, 离开的终点*/
//     .hello-enter, .hello-leave-to {
// 		transform: transslateX(-100%);
// 	}
// 	/*进入的终点, 离开的起点*/
// 	.hello-enter-to, .hello-leave {
// 		transform: translateX(0);
// 	}
.fade-list-enter-active {
  opacity: 0;
  // transform: translateY(100%);
}

.fade-list-enter-to {
  opacity: 1;
  // transform: translateY(0);
  transition: all 0.3s; //transition要写在此处
}

.card-enter-active {
  animation: swing-in-top-fwd 0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
}

.card-leave-active {
  animation: swing-out-top-bck 0.3s cubic-bezier(0.600, -0.280, 0.735, 0.045) both;
}
</style>





