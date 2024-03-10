<template>
    <div class="user-centre">
        <hint :title="hintt" :titlees="reges"></hint>
        <div class="user-top">
            <div class="user-bg">
                <img src="@/assets/images/2.jpg" alt="">
                <div class="u-b-bg"></div>
            </div>
            <div class="user-bottom">
                <div class="user-b-l">

                    <img class="user-portrait" :src="peruser.portrait">


                    <div class="user-name">
                        <p>{{ peruser.nickname }}</p>
                        <p>{{ peruser.motto }}</p>
                    </div>
                </div>
                <div class="user-b-r">
                    <div>
                        消息
                    </div>
                </div>
            </div>
        </div>

        <div class="user-list">
            <ul class="user-l-cata">
                <li :class="{ 'u-active': uactive == index }" @click="activecat(index)" v-for="(item, index) in usercata"
                    :key="index">
                    <svg-icon :iconName="item.icon" :color="item.color"></svg-icon>
                    <span>
                        {{ item.title }}
                    </span>
                </li>
                <span class="user-bot" :style="{ left: 12 + (80 * uactive) + 'px' }"></span>
            </ul>
            <ul class="user-read">
                <li>
                    <p>关注数</p>
                    <p>0</p>
                </li>
                <li>
                    <p>粉丝</p>
                    <p>0</p>
                </li>
                <li>
                    <p>点击量</p>
                    <p>0</p>
                </li>
                <li>
                    <p>获赞量</p>
                    <p>0</p>
                </li>
            </ul>


        </div>
        <div class="user-data-box">



            <!-- <transition mode="out-in"> -->
            <div class="user-article" v-show="uactive == 0">
                <div class="article-list">


                    <ArticleList3></ArticleList3>
                </div>
            </div>

            <div class="user-sc">
                <div class="user-sc-null" v-show="uactive == 1">
                    <img :src="global.imgnull" alt="">
                    <p>空空如也...</p>
                </div>
            </div>
            <div class="user-pl" v-show="uactive == 2">
                <div class="comment-list-1 fade-in-bottom " v-for="(item, index) in commentlist" :key="index">
                    <!-- <img  @error.once="global.lodinimg" :src="item.user_portrait || global.newimg" alt="" @click="toarticle(item.article_aid)"> -->
                    <div class="comment-list-1-1">
                        <p class="com-user-name" @click="toarticle(item.article_aid)"> <span>{{ item.user_nickname }}</span>
                            <span>{{ global.DateFormatPipe(item.user_regtime, "yyyy-MM-dd HH:mm:ss") }}</span>
                        </p>
                        <div class="com-con">
                            <p>{{ item.Comment_content }}</p>
                        </div>
                        <div class="com-list-b">
                            <div>
                                <svg-icon iconName="icon-good" color="#000"></svg-icon><span>点赞 0</span>
                            </div>
                            <div>
                                <svg-icon iconName="icon-liuyan" color="#000"></svg-icon><span>回复 0</span>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- <div class="user-sc-null" v-if="commentlist.length == 0">
                  <img :src="global.imgnull" alt="">
                  <p>空空如也...</p>
              </div> -->
            </div>
            <div class="user-data" v-show="uactive == 3">

                <div class="user-data-1">
                    <div class="user-data-top">

                        <div class="user-d-1" @mouseenter="portraitcat" @mouseleave="portraitcat">
                            <img @error.once="global.lodinimg" :src="imgurl" alt="">

                            <transition>
                                <div v-show="portraitshow && token">
                                    <svg-icon iconName="icon-portraitture" color="#000"></svg-icon>
                                    <p>修改头像</p>
                                    <input type="file" @change="upportrait">
                                </div>
                            </transition>


                        </div>


                        <div class="user-d-2">
                            <p> <span>{{ peruser.nickname }}</span> <span v-if="token"> <span @click="psshow = !psshow"
                                        v-if="psshow && token">修改密码</span><span v-else
                                        @click="psshow = !psshow">修改资料</span></span> </p>

                            <p>{{ global.DateFormatPipe(peruser.regtime, 'yyyy-MM-dd HH:mm:ss') }}</p>
                        </div>

                    </div>

                    <transition mode="out-in">
                        <div class="user-update" v-if="!psshow">
                            <div class="input-list">
                                <p>昵称</p>
                                <input type="text" :disabled="token ? false : true" v-model="user.nickname">
                            </div>
                            <div class="input-list">
                                <p>个人签名</p>
                                <input type="text" :disabled="token ? false : true" v-model="user.motto"
                                    placeholder="介绍下自己吧">
                            </div>
                            <div class="input-list">
                                <p>性别</p>
                                <select v-model="user.gender" @change="genderselect" :disabled="token ? false : true">
                                    <option v-for="(item, index) in gender" :key="index" :value="item.name">{{ item.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="input-list">
                                <p>个人网站</p>
                                <input type="text" :disabled="token ? false : true" v-model="user.webName"
                                    placeholder="请输入网站名称">

                            </div>
                            <div class="input-list">
                                <p></p>
                                <input type="text" :disabled="token ? false : true" v-model="user.website"
                                    placeholder="请输入网址">

                            </div>

                        </div>

                        <div class="pa-update" v-else>
                            <div class="input-list" v-show="psshow">
                                <p>邮箱</p>
                                <input type="text" disabled="false" :placeholder="peruser.account">
                            </div>

                            <div class="input-list" v-show="psshow">
                                <p>原密码</p>
                                <input type="text" v-model="upps.password">
                            </div>
                            <div class="input-list">
                                <p>新密码</p>
                                <input type="text" v-model="upps.newpassword">
                            </div>
                            <div class="input-list" >
                                <p>确认密码</p>
                                <input type="text" v-model="upps.rpassword">
                            </div>
                        </div>


                    </transition>




                </div>

                <div v-if="token">
                    <div class="user-d-bu" v-if="!psshow">
                        <qzbutton @click="usersubmit" :title="'确认修改'" :icon="true" :width="'200'" :height="'34'" radius="4">
                        </qzbutton>
                    </div>

                    <div class="user-d-bu" v-else>
                        <qzbutton @click="userps" :title="'确认修改'" :icon="true" :width="'200'" :height="'34'" radius="4">
                        </qzbutton>
                    </div>
                </div>


            </div>

            <!-- </transition> -->
        </div>


    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeMount, watch } from "vue";
import qzbutton from '@/components/qz/button/index.vue'
import { userInfo,updateUser,updatePassword } from '@/utils/user';
import { useGlobalStore } from '@/stores/index.ts'
import { getArticleList, getListPage, getArticleId, getArticleType } from '@/utils/article'
import { ElMessage, useId } from 'element-plus'
import global from "@/assets/tool/index"
import hint from '@/components/qz/hint/index.vue'
import ArticleList3 from "@/components/article/articleList3.vue"
import { useRouter, useRoute } from "vue-router";
import { stringify } from "querystring";
const store = useGlobalStore()
const route = useRoute()
//公共
const peruser: any = ref({})

const token = ref(false)

// console.log(store.user.uid, Number(userId.value))







const router = useRouter();
const hintt = ref("")
const reges = ref(false)
const psshow = ref(false)
const imgurl = ref("")
const portraitshow = ref(false)
const articledata = reactive([] as any[])
const commentlist = ref()
const user: any = ref({

})

const userId:any = ref(route.params.uid)


if (store.user) {
    if (store.user.uid == userId.value) {

        token.value = true
        // console.log(token.value, 88888888);

    }
}

//修改密码
const upps: any = ref({
        password:"",
        rpassword:"",
        newpassword:"",
        code:""
})


if (userId.value) {
    userInfo(userId.value).then((res: any) => {
        console.log(res, 11);
        res.portrait = global.baseURL + "/api" + res.portrait

        console.log(res, 6666, peruser.value);

        peruser.value = {...res}
        
        //   user.nickname = res.nickname
        //   user.motto = res.motto
        //   user.gender = res.gender
        user.value = res

        console.log(user.value, '用户信息');

        imgurl.value = res.portrait
    })

}










//切换模块
function activecat(index: any) {
    uactive.value = index
    // console.log(uactive.value);


}

// //获取用户评论
// getcuid(userId.value).then((res: any) => {
//   // console.log(res);

//   res = res.map((item: any) => {
//       return {
//           ...item,
//           article_cover: global.baseURL + item.article_cover,
//           user_portrait: global.baseURL + item.user_portrait
//       }
//   })
//   commentlist.value = res
// }).catch((err: any) => {
//   console.log("请求失败", err);

// })

function toarticle(id: any) {
    router.push(`article?id=${id}`)
}





//获取用户发表的文章

// function getarticle() {
 
// }

// getarticle()


// watch(articledata, (newVal:any, oldVal:any) => {
//   // console.log(articledata, 44, newVal, oldVal);

//   // getarticle()
//   // getarticle()

// })

// 图片上传
function upportrait(e: any) {
    console.log(e);
    let file = e.target.files[0];
    console.log(file);
    imgurl.value = URL.createObjectURL(file)
    // console.log(imgurl.value);
    //上传的图片
    user.value.portrait = file

}


function hintno() {
    setTimeout(function () {
        reges.value = false

    }, 2000)
}

//修改密码

function tologin() {
    router.push("/login")
}


function userps() {
    if (upps.value.password == "") {
        hintt.value = "原密码不能为空!"
        reges.value = true
        hintno()
    } else if (upps.value.newpassword == "") {
        hintt.value = "新密码不能为空!"
        reges.value = true
        hintno()
    } else if (upps.value.newpassword.length > 8 || upps.value.newpassword.length < 6) {
        hintt.value = "请输入6~8位数密码！"
        reges.value = true
        hintno()
    }
    else if (upps.value.newpassword !== upps.value.rpassword) {
        hintt.value = "两次密码不一致!"
        reges.value = true
        hintno()
    } else {

        
        let   data= new FormData()
        data.append("uid",userId.value)
        data.append("password",upps.value.password)
        data.append("newPassword",upps.value.newpassword)
   

        
        
        updatePassword(data).then((res:any)=>{
            console.log(res,"修改密码");
            if(res){
                ElMessage.success("修改密码成功,请重新登录")
                store.userdelete()
                tologin()
            }else{
                ElMessage.error("原密码不正确")
            }
            
        })
     
    }





}

//修改用户资料
function usersubmit() {
    console.log(user.value, user.portrait);



    let newuser = new FormData();
    newuser.append("nickname", user.value.nickname)
    newuser.append("files", user.value.portrait)
    newuser.append("website", user.value.website)
    newuser.append("webName", user.value.webName)

    newuser.append("motto", user.value.motto)
    newuser.append("gender", user.value.gender)
    newuser.append("uid", store.user.uid) 


    updateUser(newuser).then((res:any)=>{
            console.log(res,"修改成功");
            ElMessage.success("修改成功")
            peruser.value.nickname=user.value.nickname
            peruser.value.motto=user.value.motto
            
    })  



  



}

function portraitcat() {
    portraitshow.value = !portraitshow.value
}
const uactive = ref(0)
const gender = reactive([
    { name: "保密" },
    { name: "男" },
    { name: "女" },

])
function genderselect() {
    // console.log(user.gender);

}
const usercata = reactive([
    {
        title: "文章",
        icon: "icon-bianjiwenzhang_huaban",
        color: "#00a2e3"
    },
    // {
    //     title: "动态",
    //     icon: "icon-bianjiwenzhang_huaban",
    //     color: "#00a2e3"
    // },
    {
        title: "收藏",
        icon: "icon-shoucang",
        color: "#00a2e3"
    },
    {
        title: "评论",
        icon: "icon-liuyan",
        color: "#00a2e3"
    },
    {
        title: "个人资料",
        icon: "icon-wode",
        color: "#00a2e3"
    }
])

</script>

<style scoped lang="scss">
.article-list {
    max-width: 1340px;
    margin: 0 auto;
    margin-top: 20px;

    //   padding: 0 20px;
    .classify {
        display: flex;
        background: var(--main-bg-color);
        box-shadow: 0 8px 16px -4px #2c2d300c;
        border: 0 8px 16px -4px #2c2d300c;
        border-radius: 12px;
        padding: 20px;


        li {
            padding: 8px 12px;
            margin-right: 10px;
            transition: .3s;
            cursor: pointer;
            border-radius: 8px;
            color: var(--main-color);
        }

        li:hover {
            color: #fff;
            background: var(--theme-color);

        }
    }

    .class-active {
        background: var(--theme-color);
        color: #fff !important;

    }

}

.user-sc-null {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    padding: 40px;

    p {
        color: #999;
    }
}

.user-d-bu {
    margin-top: 60px;
    display: flex;
    justify-content: center;
}

.user-data-box {
    // background: #fff;
    // height: 600px;
}

.input-list {
    display: flex;
    padding: 10px;
    align-items: center;

    p {
        flex: 1;
        text-align: right;
        margin-right: 20px;
        color: #999;
    }

    input {
        flex: 8;
        outline: none;
        border: 1px solid var(--input-b);
        background: var(--header-bg);
        color: var(--nav-color);
        transition: .3s;
        border-radius: 4px;
        height: 34px;
        padding: 0 10px;
    }

    input:hover {
        border: 1px solid var(--theme-color);
    }

    input:focus {
        border: 1px solid var(--theme-color);
    }

    select {
        flex: 8;
        outline: none;
        border: 1px solid var(--input-b);
        background: var(--header-bg);
        color: var(--nav-color);
        transition: .3s;
        border-radius: 4px;
        height: 34px;
        padding: 0 10px;
    }

    select:hover {
        border: 1px solid var(--theme-color);
    }

    select:focus {
        border: 1px solid var(--theme-color);
    }
}

.user-data {
    width: 100%;
    background: var(--header-bg);
    color: var(--nav-color);
    transition: .3s;
    padding: 40px 0;

}

.user-data-1 {
    width: 50%;
    margin: 0 auto;

}

.user-data-top {
    display: flex;
    align-items: center;

    .user-d-1 {
        overflow: hidden;
        position: relative;
        border-radius: 50%;
        width: 80px;
        height: 80px;
        margin-right: 20px;
        cursor: pointer;



        div {
            position: absolute;
            bottom: 20px;
            left: 14px;
            text-align: center;
            font-weight: 600;
            font-size: 12px;

            p {
                color: #999;
            }

            input {
                opacity: 0;
                transform: scale(3, 3);
                position: absolute;
                top: 0;
                left: 150px;
            }

        }

        img {
            object-fit: cover;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-right: 20px;
        }
    }


    .user-d-2 {
        height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    p:nth-child(1) {
        display: flex;
        align-items: center;

        span:nth-child(1) {
            font-size: 24px;
            font-weight: 600;
        }

        span:nth-child(2)>span {
            border: 1px solid var(--theme-color);
            color: var(--theme-color);
            padding: 4px;
            font-size: 14px;
            border-radius: 4px;
            margin-left: 20px;
            cursor: pointer;
        }

        span:nth-child(2)>span:hover {
            background: rgba(150, 187, 212, 0.1);
        }

    }

    p:nth-child(2) {
        color: #999;
    }
}

.user-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--header-bg);
    color: var(--nav-color);
    transition: .3s;
    border-radius: 8px;
    margin-top: 20px;
    padding: 0 20px;
    box-shadow: 0 0 10px var(--main-shadow);

    .user-l-cata {
        display: flex;
        position: relative;

        .user-bot {
            position: absolute;
            width: 30px;
            height: 4px;
            border-radius: 8px;
            background: var(--theme-color);
            bottom: 14px;
            left: 14px;
            transition: .3s;
        }

        li {
            display: flex;
            align-items: center;
            margin-right: 30px;
            transition: .3s;
            position: relative;
            cursor: pointer;
            padding: 30px 0;

            span {
                margin-left: 4px;
            }
        }

        li:hover {
            color: var(--theme-color);
        }
    }

    .user-read {
        display: flex;

        li {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            margin: 0 10px;

            p:nth-child(1) {
                color: #999;
            }

            p:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
}

.u-active {
    color: var(--theme-color);
}

// .u-active::after {
//     content: "";
//     width: 100%;
//     height: 4px;
//     border-radius: 8px;
//     position: absolute;
//     left: 0;
//     bottom: 0px;
//     background: var(--theme-color);
//     transition: .3s;
// }

.user-centre {
    width: 1320px;
    margin: 0 auto;
}

.u-b-bg {
    width: 1320px;
    height: 364px;
    background-image: linear-gradient(0deg, rgba(29, 41, 49, .4) 3em, rgba(255, 255, 255, 0) 8em);
    position: absolute;
    top: 0;
    left: 0;

}

.user-top {
    border-radius: 8px;
    overflow: hidden;
    margin-top: 10px;
    box-shadow: 0 0 10px var(--main-shadow);


}

.user-bg {
    width: 100%;
    height: 364px;
    position: relative;

    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
}

.user-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--header-bg);
    color: var(--nav-color);
    transition: .3s;
    padding: 0px 40px;
    position: relative;
    height: 96px;

    .user-portrait {
        position: absolute;
        top: -70px;
        width: 140px;
        height: 140px;
        border-radius: 6px;
        border: 4px solid var(--main-bg-color);
    }

    .user-b-l {
        display: flex;

    }

    .user-name {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 160px;

        p:nth-child(1) {
            font-size: 24px;
            font-weight: 600;
        }

        p:nth-child(2) {
            margin-top: 10px;
            color: #999;
        }
    }
}

.user-pl {
    padding: 20px;
    background: var(--header-bg);
    color: var(--nav-color);
    transition: .3s;
}

.comment-list-1 {

    display: flex;
    padding: 20px 0;

    .com-user-name {
        cursor: pointer;
        font-size: 18px;
        display: flex;
        width: 100%;
        justify-content: space-between;
        transition: .3s;

        span:nth-child(2) {
            font-size: 14px;
            color: #999;
        }
    }

    .com-user-name:hover {
        color: var(--theme-color);
    }

    >img {
        cursor: pointer;
        width: 48px;
        height: 48px;
        border-radius: 50%;

    }

    .comment-list-1-1 {
        width: 100%;
        padding-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .com-list-b {
            display: flex;

            >div {
                margin-right: 20px;
                color: #999;
                display: flex;
                align-items: center;
                overflow: hidden;

                span {
                    margin-left: 4px;
                }
            }
        }

        .svg-icon {
            color: var(--nav-color) !important;
            filter: drop-shadow(20px 0 var(--nav-color));
            position: relative;
            left: -20px;

        }

        .com-con {
            padding: 15px 0;
        }

    }
}

.v-enter-active {
    animation: fade-in-bottom 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

.v-leave-active {
    animation: fade-out-bottom 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}</style>