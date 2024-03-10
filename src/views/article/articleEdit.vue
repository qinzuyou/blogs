
<script setup lang="ts">
import { shallowRef, ref, onBeforeUnmount, reactive, onMounted, shallowReactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import Qzbutton from '@/components/qz/button/index.vue'
import { getArticleType, addAticle,addLabel } from '@/utils/article.ts'
import Hint from '@/components/qz/hint/index.vue'
import Tool from "@/assets/tool/index"
import ImgModel from "@/components/imgModel/index.vue"
import {useGlobalStore} from "@/stores/index"
import Huge from '@/components/hugescreen/index.vue'




const store = useGlobalStore()

const router = useRouter()




//wang-editor
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import weEditor from '@/components/edit/weEditor.vue';
const editorRef = shallowRef()
const mode = 'default'
const valueHtml = ref("")

//工具栏配置
const toolbarConfig = {

  // mode: 'simple', // 指定简介模式
  // toolbarKeys:[
  //           "fontSize",'header1', 'header2', 'header3','header4','|',
  //           'blockquote',"code","codeBlock",'|',
  //           'bold', 'underline', 'italic', 'through', 'color', 'bgColor', 'clearStyle', '|',
  //           'bulletedList', 'numberedList', 'todo', 'justifyLeft','justifyCenter', 'justifyRight', '|',
  //           'insertLink',
  //           {
  //               key: 'group-image',
  //               title: '图片',
  //               iconSvg: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z\"></path></svg>",
  //               menuKeys: ['insertImage', 'uploadImage']
  //           },
  //           "insertTable",
  //           "|",
  //           "undo","redo"
  //       ]

}

//编辑器配置
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    // 配置默认字号
    // 配置上传图片
    uploadImage: {
      // 请求路径
      server: Tool.baseURL + "/api/t-article/ajaxUploadFile",
      // 后端接收的文件名称
      fieldName: "files",
      maxFileSize: 10 * 1024 * 1024, // 1M
      // 上传的图片类型
      allowedFileTypes: ["image/*"],
      // 小于该值就插入 base64 格式（而不上传），默认为 0
      base64LimitSize: 10 * 1024, // 10MB
      // 自定义插入返回格式【后端返回的格式】
      customInsert(res, insertFn) {
        console.log(res, insertFn, 555);

        if (res.code != 200 && res.success == false) {
          ElMessage.error("上传文件失败，" + res.message)
          return
        }
        let url = Tool.baseURL +"/api"+ res.sqlImg
        insertFn(url, "图片", url)
      },
      // 携带的数据
      // meta: {
      //     token: 'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NjM0MjQ5MzEsInN1YiI6ImFkbWluIiwiaWF0IjoxNjYzNDIzMTMxOTAyfQ.McM6MZ6N9dQnAKym-9_TqAv6gjRWqf72Q4MTnMlS9AeIM-DhCjaJJrUMYbB8hs5r-HXYSXbs5O5pk9f_KUbGQg'
      // },
      // 将 meta 拼接到 url 参数中，默认 false
      metaWithUrl: true,
      // 单个文件上传成功之后
      onSuccess(files, res) {
        console.log(files, res, 444);

        if (res.code == 200) {
          ElMessage.success(`${files.name} 上传成功`)
          return
        } else {
          ElMessage.warning(`${files.name} 上传出了点异常`)
          return
        }
        // console.log(`${file.name} 上传成功`, res)
        //ElMessage.success(`${file.name} 上传成功`, res)
      },
      // 单个文件上传失败
      onFailed(file, res) {
        console.log(res)
        ElMessage.error(`${file.name} 上传失败`)
      },
      // 上传错误，或者触发 timeout 超时
      onError(file, err, res) {
        console.log(err, res)
        ElMessage.error(`${file.name} 上传出错`)
      },
    }
  }

}
const handleChange = (editor: any) => {
  console.log('change:', editor.getHtml(),editor.getText());
};


const articleList = reactive({
  content: onMounted,
  name: "test",
})



const change = function () {
  
  console.log(valueHtml.value,editorRef.value,1111111111
  );

}


onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

onMounted(() => {

  
  valueHtml.value = ""
})
//markdom-html
//  import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html';
// import '@kangc/v-md-editor/lib/style/preview-html.css';

// 引入使用主题的样式
// import '@kangc/v-md-editor/lib/theme/style/vuepress';

let uPhtml = ref("")




// markdom

import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';
// import Highlight  from '@/types/highlight'
import Codemirror from 'codemirror';
// import {Codemirror} from 'codemirror-editor-vue3';


// mode
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/vue/vue';
// edit
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets';
// placeholder
import 'codemirror/addon/display/placeholder';
// active-line
import 'codemirror/addon/selection/active-line';
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
// style
import 'codemirror/lib/codemirror.css';


VMdEditor.Codemirror = Codemirror;
VMdEditor.use(githubTheme, {
  Hljs: hljs,
});





let editCut = ref(true)
let text = ref(111)

//标签云
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

let oldTypeList = reactive([

])


//获取所有文章类型
getArticleType().then((res: any) => {
  res = res.map((item: any) => {

    let index = Math.floor(Math.random() * bgList.length)
    let newColor = bgList[index];
    return {
      ...item,
      color: newColor,
    }
  })

  oldTypeList.push(...res)
  console.log(res, "文章类型", oldTypeList);
  typevalue.value=res[0].name
  typeTid.value=res[0].tid


}).catch((err: any) => {
  console.log(err);

})



let typeList = reactive({ list: [] })

let typevalue=ref("")
let typeTid=ref("")


function tidCut(e:any){
    console.log(e);
    typeTid.value=e
    
}

//添加文章类型标签
function addTypeList(index: any) {
  typeList.list.push(oldTypeList[index])

  typeList.list = [...new Set(typeList.list)]
  console.log(typeList);


  //  let res=typeList.filter((item:any)=>{
  //         item.name==oldTypeList[index].name
  //     })

  // console.log(res);

}


//删除文章类型标签
function deleteType(index: any) {

  typeList.list.splice(index, 1)


  console.log(typeList);

}

let articleTitle = ref("")
//上传的文章信息
let article = reactive({
  data: {
    title: "",
    cover: "",
    u_id: store.user.uid,
    content: "",
    typelist: "",
    a_like: "0",
    hits: "0",
    introduce:''
  }
})
let coverImg = ref()
//图片上传
function upCover(e: any) {
  let file = e.target.files[0];

  console.log(file);

  // console.log(file);
  coverImg.value = URL.createObjectURL(file)
  article.data.cover = file

}

//警告信息
let hint = ref("")
let hintIn = ref(false)

function HintOut() {
  setTimeout(() => {
    hintIn.value = false
  }, 1200)

}
//文章上传
async function articleSubmit() {
  

  article.data.title = articleTitle.value
  article.data.content = valueHtml.value
  // article.data.typelist= JSON.stringify(typeList.list)

  let newArticleT = []

  for (let item of typeList.list) {
    newArticleT.push(item.name)
  }

  article.data.typelist = JSON.stringify(newArticleT)
  console.log(newArticleT, "上传的文章类型");


  if (article.data.title == "") {
    hintIn.value = true
    hint.value = "标题不能为空！"
    HintOut()
  } else if (typevalue.value == "") {
    hintIn.value = true
    hint.value = "文章类型不能为空！"
    HintOut()
  } else if (article.data.content == "" || article.data.content == "<p><br></p>") {
    hintIn.value = true
    hint.value = "文章内容不能为空！"
    HintOut()
  } else {
    let upArticle = new FormData()

    //文章
    let newTag= JSON.stringify(tagList)
    
    upArticle.append("title", article.data.title)
    upArticle.append("files", article.data.cover)
    upArticle.append("uId", article.data.u_id)
    upArticle.append("content", article.data.content)
    upArticle.append("typeList", article.data.typelist)
    upArticle.append("aLike", article.data.a_like)
    upArticle.append("hits", article.data.hits)
    upArticle.append("labelList",newTag)
    upArticle.append("introduce",article.data.introduce)
    upArticle.append("tId",typeTid.value)
    


    //标签

    let upLabel = new FormData()

   

    upArticle.append("oldTypeList",newTag)

    

    // console.log(upArticle.get("uId"), article, "文章信息");

    for(let labels of tagList){
        upLabel.append("name",labels)
    }

    upLabel.append("uid",store.user.uid)
    console.log(upLabel.getAll("name"));
    

    
    
   await addAticle(upArticle).then((res: any) => {
      // hintIn.value = true
      // hint.value = "发表成功！"
      // HintOut()
      ElMessage.success("发表成功！")
      console.log(res, "发表成功");

    }).catch((err: any) => {

      console.log(err);

    })

    if(tagList.length!=0){
          await  addLabel(upLabel)
    }






  }






}

let coverCut = ref(false)


function coverCuts() {
  coverCut.value = !coverCut.value
}

//表单数据
let fileInput: any = ref("")

//删除图片
function deleteCover() {
  article.data.cover = ""
  coverImg.value = ""
  // if(fileInput.value.value!="") fileInput = ""
}

let imgModel = ref(false)

function imgModelShow() {

  imgModel.value = !imgModel.value
  console.log(imgModel.value);

}


//添加标签
  let lable=ref("")

  let tagList=reactive([])


  function addTag(){
  let list = tagList.filter((item:any)=>{
      return item==lable.value
    })

    if(list.length==0&&lable.value!=""){
        tagList.push(lable.value)
    }

  
  }

  function deleteTag(index:any){
      tagList.splice(index,1)
  }


</script>

<template>
  <div>
     <Huge :title="'文章编辑'"></Huge>

  <div class="article-edit fade-in-bottom">
    <Transition>
      <ImgModel v-if="imgModel" :img="coverImg" @set-show="imgModelShow"></ImgModel>
    </Transition>

    <Hint :title="hint" :titlees="hintIn"></Hint>
    <div class="edit-top article-shadow " :class="{ 'edit-top-w': !editCut }">
      <div class="edit-logo">
        <img src="@/assets/images/qqtx.png" alt="">
      </div>
      <ul>
        <li>
          <Qzbutton :title="'草稿箱'" iconName="icon-login" :icon="false" :width="'105'" :height="'34'" radius="4">
          </Qzbutton>
        </li>
        <li>
          <Qzbutton :title="'发布'" @click="articleSubmit" iconName="icon-login" :icon="false" :width="'105'" :height="'34'"
            radius="4"></Qzbutton>
        </li>
        <li @click="editCut = !editCut">
          <svg-icon iconName="icon-search" class="sous-icon" color="#000"></svg-icon>
        </li>
        <li>
          <img src="@/assets/images/1.jpg" alt="">
        </li>
      </ul>
    </div>

    <div class="at-title article-shadow" :class="{ 'edit-top-w': !editCut }">
      <input type="text" v-model="articleTitle" placeholder="请输入标题">
    </div>

    <div class="article-type article-shadow" :class="{ 'edit-top-w': !editCut }">
      <div class="type-content">
        <p>文章类型</p>

        <!-- <ul class="type-list" v-if="typeList.list.length != 0">
          <li class="lable-item" v-for="(item, index) in typeList.list" :key="index">
            <p :style="{ background: item.color }">{{ item.name }}</p>
            <svg-icon iconName="icon-search" class="sous-icon" color="#000" @click="deleteType(index)"></svg-icon>


          </li>
        </ul>

        <ul class="lable-list">
          <li class="lable-item" v-for="(item, index) in oldTypeList" :key="index" @click="addTypeList(index)">
            <p :style="{ background: item.color }">{{ item.name }}</p>
          </li>
        </ul> -->

        <el-select v-model="typevalue"  class="m-2" placeholder="Select" size="large" @change="tidCut" style="width: 240px" >
          <el-option v-for="item in oldTypeList" :key="item.wid" :label="item.name" :value="item.tid" />
        </el-select>

      </div>
    </div>

    <div class="article-label article-shadow" :class="{ 'edit-top-w': !editCut }">
      <p>文章标签</p>
      <ul class="label" v-show="tagList.length!=0">
          <li v-for="(item,index) in tagList" :key="index">
        <p>#{{item}}</p> 
        <svg-icon iconName="icon-search" class="sous-icon" color="#000" @click="deleteTag(index)"></svg-icon> 
          </li>
      </ul>
      <div class="label-in"> <input type="text" v-model="lable">
        <Qzbutton :title="'添加'" iconName="icon-login" :icon="false" :width="'80'" :height="'30'" radius="4" @click="addTag">
        </Qzbutton>
      </div>
    </div>

    <div class="article-introduce article-shadow" :class="{ 'edit-top-w': !editCut }">
      <p>文章介绍</p>
      
      <div>
         <textarea class="introduce-text" v-model="article.data.introduce"> </textarea>
      </div>
     

     
    </div>

    <div class="cover article-shadow" :class="{ 'edit-top-w': !editCut }">
      <p>文章封面</p>
      <div class="cover-submit">

        <transition mode="out-in">
          <div class="cover-s-box" @mouseenter="coverCuts" @mouseleave="coverCuts" v-if="coverImg">
            <transition>
              <ul v-if="coverCut">
                <li>
                  <svg-icon iconName="icon-search" @click="imgModelShow" color="#fff"></svg-icon>
                </li>
                <li @click="deleteCover">
                  <svg-icon iconName="icon-lajitong" color="#fff"></svg-icon>
                </li>

              </ul>
            </transition>
            <img :src="coverImg" alt="">
          </div>


          <label for="submit" class="upload-box" v-else>
            <div class="uploadImg">
              <svg-icon iconName="icon-wei-1" color="#ccc"></svg-icon>
            </div>
            <input id="submit" type="file" style="display:none" accept="image/*" ref="fileInput" @change="upCover" />

          </label>

        </transition>
      </div>

    </div>


    <div class="blog-edit">

      <Transition mode="out-in">
       
        <div class="edit-con article-shadow" :class="{ 'edit-top-w': !editCut }">
          <div style="border: 1px solid #ccc">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
              :mode="mode" />
            <Editor style="height: 500px; " v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode"   @onChange="handleChange"
              @onCreated="handleCreated" @click="change()" />

          </div>


        </div>

        <!-- <div class="md-edit-c"> -->
        <!-- <v-md-editor v-model="text" height="400px"></v-md-editor> -->
        <!-- <v-md-editor height="800px" :text="valueHtml"></v-md-editor> -->
        <!-- <v-md-preview-html :html="html" preview-class="vuepress-markdown-body"></v-md-preview-html> -->
        <!-- </div> -->
      </Transition>


    </div>

  </div>
  </div>
   
</template>

<!-- <style src="@wangeditor/editor/dist/css/style.css"></style> -->
<style  lang="scss" scoped>


.edit-con{
 :deep(.w-e-toolbar) {
  transition: .3s;
}
:deep(.w-e-text-container){
  transition: .3s;
}
}
.article-introduce{
  width: 1000px;
  margin: 0 auto;
  padding: 10px;
  margin-top: 10px;
  p{
    transition: .3s;
    color: var(--main-color);
  }
  >div{
    padding: 15px;
    border: 1px solid rgba(144, 147, 153, 0.3137254902);
    border-radius: 5px;
    margin-top: 20px;
  }
  .introduce-text{
    width: 100%;
    height: 130px;
    border: none;
    resize: none;
    color: var(--main-color);
    background: transparent;
    transition: .3s;
    font-size: 15px;
  }
}
.article-label {
  width: 1000px;
  margin: 0 auto;
  padding: 10px;
  margin-top: 10px;
  p{
    color: var(--main-color);
    transition: .3s;
  }
  .label {
    
    margin-top: 10px;
    border: 1px solid #999;

    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    border: 1px solid #999;
    border-radius: 4px;
    margin: 10px 0;

    li{
      border-radius: 2px;
    background: var(--classB);
    color: var(--routine);
    display: flex;
    align-items: center;
    padding: 4px;
    margin-right: 10px;
    p{
      margin-right: 4px;
    }
    }

  }

  .label-in {
    margin-top: 10px;
    display: flex;
    input{
      margin-right: 10px;
      transition: .3s;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 0 10px;
    }
    input:hover{
      border: 1px solid var(--theme-color);
    }
    input:focus{
      border: 1px solid var(--theme-color);

    }
  }
}

.uploadImg {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
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

//   ::-webkit-scrollbar {
//   width: 0 !important;
// }
// ::-webkit-scrollbar {
//   width: 0 !important;height: 0;
// }

::-webkit-scrollbar {
  display: none !important;
}


.at-title {
  padding: 15px;
  width: 1000px;
  margin: 0 auto;
  margin-top: 10px;
  transition: .3s;

  input {
    outline: none;
    padding: 10px;
    font-size: 24px;
    color: var(--main-color) !important;
    border: none;
    background: var(--main-bg-color);
    transition: .3s;
  }
}

.cover {
  width: 1000px;
  margin: 0 auto;
  padding: 15px;
  margin-top: 10px;
  transition: .3s;

  p{
    transition: .3s;
    color: var(--main-color);
  }
  .cover-submit {
    display: flex;
    margin-top: 10px;
  }

  .cover-s-box {
    overflow: hidden;
    position: relative;
    width: 200px;
    height: 200px;
    border: 1px solid #cdd0d6;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;

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
  }

  img {
    transition: .3s;
    width: 200px;
    height: 200px;

  }
}

.article-type {
  width: 1000px;
  margin: 0 auto;
  padding: 15px;
  margin-top: 10px;
  transition: .3s;
  p{
    transition: .3s;
    color:var(--main-color)
  }
}

.type-list {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  border: 1px solid #999;
  border-radius: 4px;
  margin: 10px 0;

  li {
    padding: 5px;
    display: flex;
    align-items: center;

    .svg-icon {
      margin-left: 4px;
      cursor: pointer;
    }
  }

  p {
    color: #fff;
    padding: 3px 6px 3px 6px;
    font-size: 13px;
    border-radius: 2px;
    transition: .3s;
    cursor: pointer;
  }
}

.lable-list {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;



  .lable-item {
    padding: 5px;
    display: flex;

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

.md-edit-c {
  margin-top: 10px;
}

.edit-con {
  width: 1000px;
  margin: 0 auto;
  margin-top: 10px;
  padding: 15px;
  transition: .3s;
}

.edit-top-w {
  width: 100% !important;
  padding: 15px 40px !important;
  box-sizing: border-box;
}

.article-shadow {
  background: var(--main-bg-color);
  border-radius: var(--radius-wrap);

  box-shadow: var(--box-shadow);
  transition: .3s;
}

.edit-top {
  display: flex;
  width: 1000px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  transition: .3s;
  margin-top: 20px;


  .edit-logo {
    img {
      width: 40px;
      height: 40px;
    }


  }

  ul {
    display: flex;
    align-items: center;

    li {
      margin: 0 10px;

      .svg-icon {
        cursor: pointer;
      }
    }

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}

.article-edit {
  width: 100%;
  // padding-top: 60px;

}</style>