<script lang="ts" setup>
import { ref, reactive, onBeforeMount, inject, defineComponent } from "vue";
import qzbutton from '@/components/qz/button/index.vue'
import qzinput from '@/components/qz/input/index.vue'
import hint from '@/components/qz/hint/index.vue'
import { addUser, login, sendCode, verifyCode, userVerify,logingUser } from '@/utils/user';
import { useRouter, useRoute } from "vue-router";
// import global from "@/assets/js/global"



import Tool from '@/assets/tool/index'

import Cookies from 'js-cookie';
//滑块验证
import SlideVerify, { SlideVerifyInstance } from "vue3-slide-verify";
import "vue3-slide-verify/dist/style.css";

  import { useGlobalStore } from '@/stores/index'
// 普通用法
const store = useGlobalStore()



// 解构用法
//  注意：方法可以直接解构使用，但ref、计算属性等直接解构使用，会失去响应式
//  若要解构ref、计算属性，需结合pinia提供的 storeToRefs 方法进行使用
// const { add } = store
// const { counter, counterComputer } = storeToRefs(store)


const block = ref<SlideVerifyInstance>()

// 公共
const router = useRouter();
const regtitle = ref("null")
const reges = ref(false)
const email = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
function hintno() {
  setTimeout(function () {
    reges.value = false

  }, 2000)
}

// console.log(store.user, 66666666)

//登录
function toindex() {
  router.push("/")
}

const userani1 = ref(false);
const userani2 = ref(false);
const userani3 = ref(false)
const userani4 = ref(false)
const userlist = reactive({
  user: "",
  password: ""
})

//记住密码
// function pscat() {
//   console.log(store.pacat);

// }
if (userlist.user != "") {
  userani1.value = true
  userani2.value = true
  userani3.value = true
  userani4.value = true
}

function ani1() {
  if (userlist.user == '') {
    userani1.value = !userani1.value
    console.log(111);

  } else {
    userani3.value = !userani3.value
    console.log(222);
  }

}
function ani2() {
  if (userlist.password == '') {
    userani2.value = !userani2.value
    console.log(111);

  } else {
    userani4.value = !userani4.value
    console.log(222);
  }
}

//登录
async function loginsubmit() {

  if (sshCutT.value) {
    if (userlist.user == "") {
      regtitle.value = "邮箱不能为空!"
      reges.value = true
      hintno()
    } else if (!email.test(userlist.user)) {
      regtitle.value = "邮箱格式不正确!"
      reges.value = true
      hintno()
    }
    else if (userlist.password == "") {
      regtitle.value = "密码不能为空!"
      reges.value = true
      hintno()
    } else {
      let loginData = {
        account: userlist.user,
        password: userlist.password
      }
      login(loginData).then((res: any) => {
        console.log(res);

        if (res.account == null) {
          regtitle.value = res.state
          reges.value = true
          hintno()
        } else {

            res.portrait=Tool.baseImg+ res.portrait



          store.useradd(res)
          regtitle.value = res.state
          reges.value = true
          hintno()
        }



      })

    }
  } else {
    let data = {
      account: sshData.user
    }
    let userV: any;




    if (sshData.user == "") {
      regtitle.value = "邮箱不能为空!"
      reges.value = true
      hintno()
    } else if (sshData.code == "") {
      regtitle.value = "验证码不能为空!"
      reges.value = true
      hintno()
    } else {
      await userVerify(data).then((res: any) => {
        userV = res
      })

      if (userV) {
        const cookieValue = Cookies.get('emailLogin');

        if (cookieValue) {
          await verifyCode(sshData.code).then((res: any) => {
            console.log(res);
   
            if (res == "验证码未发送") {
          regtitle.value = "验证码未发送!"
          reges.value = true
          hintno()
          return
        } else if (res == "验证码错误") {
          regtitle.value = "验证码错误!"
          reges.value = true
          hintno()
          return
        } else if (res == "验证码正确") {
          let data={
            account:sshData.user
          }

          logingUser(data).then((res)=>{
            // console.log(res);
          store.useradd(res)

          regtitle.value = "登录成功!"
          reges.value = true
          hintno()
          })



         
        }


          })
        } else {
          regtitle.value = "验证码过期或未发送,请重新发送!"
          reges.value = true
          hintno()
        }
      }
      else {
        regtitle.value = "用户名不存在,请先注册!"
        reges.value = true
        hintno()
      }
    }


  }





}



//注册
const reglist = reactive({
  user: '',
  password: '',
  reppassword: '',
  code: '',
})

function newuser(val: any) {
  // console.log(val, 1111)
  reglist.user = val

}
function newpassword(val: any) {

  reglist.password = val

}
function newpassword2(val: any) {

  reglist.reppassword = val

}
function newpassword3(val: any) {

  reglist.code = val

}

function newpassword4(val: any) {
  sshData.user = val
}

function newpassword5(val: any) {
  sshData.code = val
}

const lore = ref(true)

function lorecut() {
  lore.value = !lore.value
}


//注册发送验证码
let codeDown = ref(30)
let codeCut = ref(false)
let codeWord = ref("发送验证码")

//登录发送验证码
let codeDown2 = ref(30)
let codeCut2 = ref(false)
let codeWord2 = ref("发送验证码")

//注册验证码发送
async function codeSend() {


  if (reglist.user == "") {

    regtitle.value = "邮箱不能为空!"
    reges.value = true
    hintno()
    // console.log(regtitle.value);

  } else if (!email.test(reglist.user)) {
    regtitle.value = "邮箱格式不正确!"
    reges.value = true
    hintno()
  } else {

    var inFifteenMinutes = new Date(new Date().getTime() + 1 * 60 * 1000);

    Cookies.set('email', reglist.user, { expires: inFifteenMinutes });
    const cookieValue = Cookies.get('email');
    // console.log(cookieValue);


    await sendCode(reglist.user).then((res: any) => {
      console.log(res);
      regtitle.value = "验证码已发送到您的邮箱!"
      reges.value = true
      hintno()
    })

    codeCut.value = true
    codeWord.value = "秒后可以重新发送"

    let djs = setInterval(() => {
      codeDown.value -= 1

      if (codeDown.value == 0) {
        clearInterval(djs)
        codeCut.value = false
        codeDown.value = 20
        codeWord.value = "发送验证码"
      }

      // console.log(codeDown.value);


    }, 1000)



  }

  // codeDown.value-=1

}


//登录注册码发送

async function codeSend2() {


  if (sshData.user == "") {

    regtitle.value = "邮箱不能为空!"
    reges.value = true
    hintno()
    // console.log(regtitle.value);

  } else if (!email.test(sshData.user)) {
    regtitle.value = "邮箱格式不正确!"
    reges.value = true
    hintno()
  } else {

    var inFifteenMinutes = new Date(new Date().getTime() + 1 * 60 * 1000);

    Cookies.set('emailLogin', sshData.user, { expires: inFifteenMinutes });
    const cookieValue = Cookies.get('emailLogin');
    // console.log(cookieValue);


    await sendCode(sshData.user).then((res: any) => {
      console.log(res);
      regtitle.value = "验证码已发送到您的邮箱!"
      reges.value = true
      hintno()
    })

    codeCut2.value = true
    codeWord2.value = "秒后可以重新发送"

    let djs2 = setInterval(() => {
      codeDown2.value -= 1

      if (codeDown2.value == 0) {
        clearInterval(djs2)
        codeCut2.value = false
        codeDown2.value = 20
        codeWord2.value = "发送验证码"
      }

      // console.log(codeDown.value);


    }, 1000)



  }

  // codeDown.value-=1

}


//注册
async function regsubmit() {
  // console.log(reglist.user);
  if (reglist.user == "") {

    regtitle.value = "邮箱不能为空!"
    reges.value = true
    hintno()
    return
    // console.log(regtitle.value);

  } else if (!email.test(reglist.user)) {
    regtitle.value = "邮箱格式不正确!"
    reges.value = true
    hintno()
    return
  } else if (reglist.password == "") {
    regtitle.value = "密码不能为空!"
    reges.value = true
    hintno()
    return
  } else if (reglist.reppassword == "") {
    regtitle.value = "重复密码不能为空!"
    reges.value = true
    hintno()
    return
  } else if (reglist.reppassword.length < 6 || reglist.reppassword.length > 8) {
    regtitle.value = "请输入6~8位数密码!"
    reges.value = true
    hintno()
    return
  }
  else if (reglist.reppassword != reglist.password) {
    regtitle.value = "两次密码不一致!"
    reges.value = true
    hintno()
    return
  } else if (reglist.code == "") {
    regtitle.value = "验证码不能为空!"
    reges.value = true
    hintno()
    return
  } else {
    // document.cookie=`email=${reglist.user};expires=30s`
    //     var inFifteenMinutes = new Date(new Date().getTime() + 1 * 60 * 1000);

    // Cookies.set('email', reglist.user, { expires: inFifteenMinutes });
    const cookieValue = Cookies.get('email');
    // console.log(cookieValue);
    if (cookieValue) {
      await verifyCode(reglist.code).then((res: any) => {
        // console.log(res);

        if (res == "验证码未发送") {
          regtitle.value = "验证码未发送!"
          reges.value = true
          hintno()
          return
        } else if (res == "验证码错误") {
          regtitle.value = "验证码错误!"
          reges.value = true
          hintno()
          return
        } else if (res == "验证码正确") {



          let list = ["梅树枝", "油饼", "香翅捞饭", "荔枝", "卤鸡脚", "梅狸猫"]
          let shuz = ""
          let nike = list[Math.floor(Math.random() * list.length)]
          for (let i = 0; i < 4; i++) {
            shuz += Math.floor(Math.random() * 10)
          }
          let nike2 = nike + shuz;

          let resData = {
            account: reglist.user,
            password: reglist.password,
            nickname: nike2,
            portrait: "2.png"
          }


          addUser(resData).then((res: any) => {
            console.log(res);
            if (!res) {
              regtitle.value = "用户已存在!"
              reges.value = true
              hintno()
              Cookies.remove('email');
            } else {
              regtitle.value = "注册成功!"
              reges.value = true
              hintno()
            }

          })
        }

      })
    } else {
      regtitle.value = "验证码未发送或已失效!"
      reges.value = true
      hintno()
      return
    }


  }


}

const msg = ref("");
const onFail = () => {
  msg.value = "验证不通过";
}

const onRefresh = () => {
  // console.log("");
}
const onAgain = () => {
  msg.value = "请重试！";
  // 刷新
  block.value?.refresh();
};

//滑块验证成功执行
function hksuccess() {
  // console.log('成功');
  if (lore.value) {
    codeSend2()
    blockShow()

  } else {
    codeSend()
    blockShow()
  }


}

let blockCut = ref(false)

function blockShow() {
  blockCut.value = !blockCut.value
}

let sshData = reactive({
  user: '',
  password: '',
  code: ''
})

let sshCutT = ref(true)

let sshCut = function () {
  sshCutT.value = !sshCutT.value
}
</script>


<template>
  <transition>
    <div class="block-bg" v-if="blockCut">

      <div class="block-model">

        <div class="block-top" style="background: url('/images/2.jpg') no-repeat;">
          <p class="close-icon"><svg-icon iconName="icon-wei-" color="#000" @click="blockShow"></svg-icon></p>
          <p class="b-t-icon"><svg-icon iconName="icon--dunpai" class="sous-icon" color="#000"></svg-icon></p>
          <p class="block-acc">滑动以完成验证</p>
        </div>
        <el-card class="cover-hk" v-if="blockCut">
          <slide-verify ref="block" slider-text="向右滑动->" :accuracy="1"  @again="onAgain" @success="hksuccess" @fail="onFail"
            @refresh="onRefresh"></slide-verify>
          <div>{{ msg }}</div>
        </el-card>
      </div>
    </div>
  </transition>


  <div class="login">






    <hint :title="regtitle" :titlees="reges"></hint>
    <div class="login-content">
      <div class="login-logo">test小站</div>

      <transition mode="out-in">
        <div class="login-view" v-if="lore">
          <div class="login-title">登录</div>
          <div class="reg-cat" @click="lorecut">没有账号？立即注册></div>


          <transition mode="out-in">
            <div v-if="sshCutT">
              <div class="user-name" :class="{ 'name-ani': userani1, 'name-ani2': userani3 }">
                <div class="user-hint" :class="{ 'ani1': userani1, 'ani2': userani3 }">账户或邮箱</div>
                <input type="text" class="user-input" v-model="userlist.user" @focus="ani1" @blur="ani1" />
              </div>
              <div class="user-password" :class="{ 'name-ani': userani2, 'name-ani2': userani4 }">
                <div class="user-hint" :class="{ 'ani1': userani2, 'ani2': userani4 }">密码</div>
                <input type="password" class="user-input" v-model="userlist.password" @focus="ani2" @blur="ani2" />
              </div>
            </div>
            <div v-else>
              <qzinput :title="'邮箱或账号'" @getData="newpassword4" :contents="sshData.user" :type="'text'"></qzinput>
              <div class="reg-code">
                <qzinput :title="'验证码'" @getData="newpassword5" :contents="sshData.code" :type="'text'"></qzinput>
                <div class="code-box" :class="{ 'forbidden2': codeCut2 }">

                  <a class="code-send" :class="{ 'forbidden': codeCut2 }" href="#" @click="blockShow()"><span
                      v-show="codeCut2" class="code-down">{{ codeDown2 }}</span> {{ codeWord2 }}</a>
                </div>
              </div>
            </div>
          </transition>

          <div class="reme">
            <!-- <input type="checkbox" id="reme-box" v-model="store.pacat" @change="pscat"> -->
            <div class="reme-che">
              <input type="checkbox" id="reme-box">
              <label for="reme-box">记住密码</label>
            </div>

            <transition mode="out-in">
              <div class="reme-ssh" v-if="sshCutT">
                <span>找回密码</span>
                <span @click="sshCut">免密登录</span>
              </div>

              <div class="reme-ssh" v-else>
                <span @click="sshCut">账号密码登录</span>
              </div>
            </transition>
          </div>

          <div class="submit">
            <qzbutton :title="'登录'" :icon="true" @click="loginsubmit" :width="'250'" :height="'34'" radius="50">
            </qzbutton>

          </div>

        </div>


        <div class="reg-view " v-else>
          <div class="login-title">注册</div>
          <div class="reg-cat" @click="lorecut">已有账号？立即登录></div>
          <qzinput :title="'邮箱或账号'" @getData="newuser" :contents="reglist.user" :type="'text'"></qzinput>
          <qzinput :title="'密码'" @getData="newpassword" :contents="reglist.password" :type="'password'"></qzinput>
          <qzinput :title="'重复密码'" @getData="newpassword2" :contents="reglist.reppassword" :type="'password'"></qzinput>
          <div class="reg-code">
            <qzinput :title="'验证码'" @getData="newpassword3" :contents="reglist.code" :type="'text'"></qzinput>
            <div class="code-box" :class="{ 'forbidden2': codeCut }">

              <a class="code-send" :class="{ 'forbidden': codeCut }" href="#" @click="blockShow()"><span v-show="codeCut"
                  class="code-down">{{ codeDown }}</span> {{ codeWord }}</a>
            </div>
          </div>


          <div class="submit">
            <qzbutton :title="'注册'" :icon="true" @click="regsubmit" :width="'250'" :height="'34'" radius="50"
              :colorLeft="'#60e464'" :colorRight="'#5cb85b'"></qzbutton>

          </div>



        </div>
      </transition>

    </div>

  </div>
  <img src="/images/2.jpg" alt="" class="login-bg">
</template>


<style scoped lang="scss">
.block-model {
  box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
  // height: 100%;
  border-radius: 8px;

  width: 340px;
  margin: 0 auto;
  margin-top: 10%;
  background: #fff;

  .block-top {
    height: 150px;
    border-radius: 8px;
    text-align: center;
    background-size: 100% !important;

    .close-icon {
      text-align: right;
      padding: 10px;
      cursor: pointer;

      .svg-icon {
        font-size: 20px;
        transition: .3s;
      }

      .svg-icon:hover {

        transform: rotate(360deg);
      }
    }

    .b-t-icon {
      padding-top: 20px;

      .svg-icon {
        font-size: 30px;
      }
    }

    .block-acc {
      color: #ff6f06;
      font-size: 18px;
      margin-top: 10px;
    }

    // overflow: hidden;
  }

  .cover-hk {
    margin: 0 auto;
    width: 100%;
    top: 20%;
  }
}

.block-bg {
  background: rgba($color: #000000, $alpha: 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  z-index: 60;
}

.forbidden {
  pointer-events: none;
  opacity: 0.6 !important;

}

.forbidden2 {
  cursor: not-allowed !important;

}

.reg-code {

  display: flex;
  align-items: center;

  .user-name {
    flex: 1;
  }

  .code-box {
    display: flex;
    margin-top: 20px;
    flex: 3;
    margin-left: 20px;



    p {
      width: 10px;
    }
  }

  .code-send {
    margin-left: 20px;
    cursor: pointer;
    transition: .3s;
    color: #2997f7;
    background: rgba(41, 151, 247, 0.1);
    padding: 10px 10px;
    font-size: 14px;
    border-radius: 4px;
  }

  .code-send:hover {

    background: rgba(41, 151, 247, 0.1);
    opacity: 0.7;

  }
}

.login-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.login {
  position: relative;
  z-index: 10;
  padding-top: 60px;
}

.out {
  opacity: 0;
}

.cut-show {
  opacity: 1;
}

.login {
  margin-bottom: 140px;
}

.login-content {
  // background: var(--header-bg);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(2px);
  color: var(--nav-color);
  transition: .3s;
  margin: 0 auto;
  margin-top: 50px;
  width: 350px;
  padding: 15px;
  box-shadow: 0 0 10px var(--main-shadow);
  border-radius: var(--main-radius);


  .login-logo {
    padding: 26px 0;
  }

  .login-title {
    font-size: 2em;
    position: relative;
  }

  .login-title::before {
    position: absolute;
    content: "";
    width: 40px;
    background: var(--theme-color);

    height: 3px;
    left: 2px;
    transition: all 0.5s;
    bottom: -8px;
    border-radius: 5px;
    box-shadow: 1px 1px 3px -1px var(--theme-color);
  }

  .login-title:hover::before {
    width: 80px;
  }
}

.login-view {

  .user-name,
  .user-password {
    position: relative;
    padding-top: 20px;
    margin-top: 20px;

    .user-hint {
      position: absolute;
      top: 20px;
      opacity: 0.5;
      transition: 0.2s;
      cursor: text;
      z-index: 1;
    }

    input {
      position: relative;
      display: flex;
      z-index: 2;
      background: none;
      color: var(--nav-color);
      transition: .3s;
      outline: none;
      height: 100%;
      width: 100%;
      border: none;
      transition: all 0.6s;
      border-bottom: 0px;
      border-bottom: 1px solid rgba($color: #000000, $alpha: 0.2);
      padding: 6px 0;

    }

  }

  .user-password {}

  .user-name::before {
    position: absolute;
    content: "";
    width: 0px;
    background: var(--theme-color);

    height: 1px;
    left: 0px;
    transition: all 0.5s;
    bottom: 0px;
    border-radius: 5px;
    //   box-shadow: 1px 1px 3px -1px var(--theme-color);
    // border-bottom: 1px solid $theme-color;
  }

  .user-name:hover::before {
    width: 100%;
  }

  .user-password::before {
    position: absolute;
    content: "";
    width: 0px;
    background: var(--theme-color);

    height: 1px;
    left: 0px;
    transition: all 0.5s;
    bottom: 0px;
    border-radius: 5px;
  }

  .user-password:hover::before {
    width: 100%;
  }

}

.reg-cat {
  padding: 14px 0;
  font-size: 12px;
  color: var(--muted-2-color);
}

.reg-cat:hover {
  color: var(--theme-color);
  cursor: pointer;
}

.ani1 {
  top: 0 !important;
  font-size: 13px;
  opacity: 1 !important;
  color: var(--theme-color);
}

.ani2 {
  opacity: 0.5 !important;
  color: #000 !important;
}

.name-ani::before {
  width: 100% !important;
  box-shadow: 1px 1px 3px 1px var(--theme-color);
}

.name-ani2::before {
  width: 0 !important;
  box-shadow: none !important;
}

.reme {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 14px;

  padding: 10px 0;
  height: 20px;
  line-height: 20px;
  position: relative;

  .reme-che {
    display: flex;
    align-items: center;
  }

  .reme-ssh {
    span {
      cursor: pointer;
      transition: .3s;

    }

    span:nth-child(2) {
      margin-left: 10px;
      border-left: 1px solid #000;
      padding-left: 10px;
    }

    span:hover {
      color: var(--theme-color);
    }
  }

  #reme-box {
    margin-right: 4px;
    cursor: pointer;

  }

  // input[type="checkbox"] {
  //   width: 12px;
  //   height: 12px;
  //   display: inline-block;
  //   text-align: center;
  //   vertical-align: middle;
  //   line-height: 12px;
  //   position: relative;
  //   transition: all .5s;
  //   border-radius: 4px;


  // }

  // input[type="checkbox"]::before {
  //   transition: all .3s;
  //   content: "";
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   background: #fff;
  //   width: 100%;
  //   height: 100%;
  //   border: 1px solid #d9d9d9;
  //   border-radius: 4px;
  //   overflow: hidden;

  // }

  // input[type="checkbox"]:checked::before {
  //   border-radius: 4px;
  //   transition: all .3s;

  //   content: "\2713";
  //   background-color: #fff;
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   border: none;
  //   color: #ffffff;
  //   font-size: 8px;
  //   font-weight: bold;
  //   background: #00a2e3;
  // }
}

.submit {
  margin: 20px;
  display: flex;
  justify-content: center;
}
</style>